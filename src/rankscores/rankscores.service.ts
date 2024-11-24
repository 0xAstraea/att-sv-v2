import { Injectable } from '@nestjs/common';
import { TransitiveTrustGraph } from '@ethereum-attestation-service/transitive-trust-sdk';
import { EASSCAN_BASE_GRAPHQL_URL } from '../../config/config';
import config from '../../data/communities';

@Injectable()
export class RankscoresService {
  private readonly PRETRUST_WALLET: string;
  private readonly PRETRUST_WEIGHT = 0.3;    // Weight for pretrust edges
  private readonly VOUCH_WEIGHT = 0.1;       // Weight for vouch edges

  constructor() {
    if (!process.env.PRETRUST_WALLET) {
      throw new Error('PRETRUST_WALLET environment variable is not set');
    }
    this.PRETRUST_WALLET = process.env.PRETRUST_WALLET;
  }

  async calculateRankScores() {
    try {
      const graph = new TransitiveTrustGraph();
      const nodeScores = new Map<string, Set<string>>();
      const vouchCounts = new Map<string, number>();
      const pretrustNodes = new Set<string>();

      // Add the pretrust wallet
      graph.addNode(this.PRETRUST_WALLET);
      graph.addEdge(this.PRETRUST_WALLET, this.PRETRUST_WALLET, 1.0, 0);

      // First identify all pretrust nodes
      const pretrustAttestations = await this.fetchAttestations(
        config.AgoraPass.pretrust_variables.where
      );
      
      for (const attestation of pretrustAttestations) {
        const { recipient } = attestation;
        if (!recipient || typeof recipient !== 'string') continue;
        pretrustNodes.add(recipient);
        graph.addNode(recipient);
        graph.addEdge(this.PRETRUST_WALLET, recipient, 1.0, 0);
        nodeScores.set(recipient, new Set(['pretrust']));
      }

      // Then add vouch edges with appropriate weights
      const vouchAttestations = await this.fetchAttestations(
        config.AgoraPass.variables.where
      );

      // Track unique attester-recipient pairs
      const processedPairs = new Set<string>();

      for (const attestation of vouchAttestations) {
        const { attester, recipient } = attestation;
        if (!attester || !recipient || typeof attester !== 'string' || typeof recipient !== 'string') continue;

        // Create a unique key for this attester-recipient pair
        const pairKey = `${attester}-${recipient}`;
        
        // Skip if we've already processed this pair
        if (processedPairs.has(pairKey)) continue;
        processedPairs.add(pairKey);

        if (!graph.getNodes().includes(attester)) {
          graph.addNode(attester);
        }
        if (!graph.getNodes().includes(recipient)) {
          graph.addNode(recipient);
        }

        // Use higher weight if attester is pretrust
        const weight = pretrustNodes.has(attester) ? this.PRETRUST_WEIGHT : this.VOUCH_WEIGHT;
        graph.addEdge(attester, recipient, weight, 0);
        
        vouchCounts.set(recipient, (vouchCounts.get(recipient) || 0) + 1);
        
        if (!nodeScores.has(recipient)) {
          nodeScores.set(recipient, new Set());
        }
        nodeScores.get(recipient)?.add('vouch');
      }

      // Compute trust scores
      const scores = graph.computeTrustScores(this.PRETRUST_WALLET);

      // Format scores
      const formattedScores = Object.entries(scores)
        .map(([address, score]) => ({
          address,
          score: score.positiveScore,
          details: {
            positive: score.positiveScore,
            negative: score.negativeScore,
            sources: nodeScores.get(address) ? Array.from(nodeScores.get(address)) : [],
            vouchCount: vouchCounts.get(address) || 0
          }
        }))
        .sort((a, b) => b.score - a.score);

      return formattedScores;
    } catch (error) {
      console.error('Error calculating rank scores:', error);
      throw error;
    }
  }

  private async fetchAttestations(whereClause: any) {
    try {
      const response = await fetch(EASSCAN_BASE_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetAttestations($where: AttestationWhereInput!) {
              attestations(where: $where) {
                id
                attester
                recipient
                revoked
                decodedDataJson
              }
            }
          `,
          variables: {
            where: whereClause
          }
        })
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      return data.data.attestations.map(attestation => ({
        id: attestation.id,
        attester: attestation.attester,
        recipient: attestation.recipient,
        decodedDataJson: attestation.decodedDataJson
      }));

    } catch (error) {
      console.error('Error fetching attestations:', error);
      throw error;
    }
  }

  async getTopTrustedAddresses(limit = 10) {
    const scores = await this.calculateRankScores();
    return scores
      .sort((a, b) => {
        // First compare by score
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        // If scores are equal, prioritize pretrust addresses
        const aIsPretrust = a.details.sources.includes('pretrust');
        const bIsPretrust = b.details.sources.includes('pretrust');
        if (aIsPretrust !== bIsPretrust) {
          return bIsPretrust ? 1 : -1;
        }
        // If both are pretrust or both are not, compare by vouch count
        return (b.details.vouchCount || 0) - (a.details.vouchCount || 0);
      })
      .slice(0, limit);
  }
}