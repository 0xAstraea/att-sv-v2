import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { communities } from '../../data/community';
import { EAS_CONFIG } from '../../config/config';
import { ethers } from 'ethers';
import { AttestationResponse } from './types';

@Injectable()
export class CommunitiesService {
  private readonly logger = new Logger(CommunitiesService.name);

  async getCommunityMembers(
    communityId: string,
    page: number = 1,
    limit: number = 10,
    uniqueAttesters: boolean = false
  ): Promise<AttestationResponse> {
    const community = communities[communityId];
    if (!community) {
      throw new NotFoundException(`Community ${communityId} not found`);
    }

    const skip = (page - 1) * limit;

    const queryBody = {
      query: `
        query GetAttestations($where: AttestationWhereInput!, $take: Int!, $skip: Int!, $distinct: [AttestationScalarFieldEnum!]) {
          attestations(
            where: $where, 
            take: $take, 
            skip: $skip,
            distinct: $distinct
          ) {
            attester
          }
        }
      `,
      variables: {
        where: {
          OR: [
            {
              decodedDataJson: {
                contains: ethers.encodeBytes32String(community.category)
              }
            },
            {
              decodedDataJson: {
                contains: ethers.encodeBytes32String(community.subcategory)
              }
            },
            {
              decodedDataJson: {
                contains: ethers.encodeBytes32String(community.platform)
              }
            }
          ],
          schemaId: {
            equals: EAS_CONFIG.VOUCH_SCHEMA
          },
          revoked: {
            equals: false
          }
        },
        take: limit,
        skip: skip,
        distinct: uniqueAttesters ? "attester" : undefined
      }
    };

    try {
      const response = await fetch(EAS_CONFIG.GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GraphQL request failed: ${response.statusText}. Details: ${errorText}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      return data;
    } catch (error) {
      this.logger.error('Error in getCommunityMembers:', error);
      throw error;
    }
  }

  private async getEnsNames(addresses: string[]): Promise<Map<string, string | null>> {
    try {
      // Debug log to see what addresses we're querying
      this.logger.debug('Fetching ENS names for addresses:', addresses);

      const response = await fetch(EAS_CONFIG.GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query EnsNames($where: EnsNameWhereInput) {
              ensNames(where: $where) {
                id
                name
              }
            }
          `,
          variables: {
            where: {
              OR: addresses.map(address => ({
                id: {
                  equals: address.toLowerCase()
                }
              }))
            }
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Debug log the response
      this.logger.debug('ENS Response:', JSON.stringify(data, null, 2));
      
      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      // Create a map of address -> ENS name
      const ensMap = new Map<string, string | null>();
      
      // Initialize all addresses with null (keep original case)
      addresses.forEach(address => ensMap.set(address, null));

      // Update the ones that have ENS names (match by lowercase)
      data.data.ensNames.forEach((ens: { id: string; name: string }) => {
        // Find the original address with matching lowercase version
        const originalAddress = addresses.find(
          addr => addr.toLowerCase() === ens.id.toLowerCase()
        );
        if (originalAddress) {
          ensMap.set(originalAddress, ens.name);
        }
      });

      // Debug log the final map
      this.logger.debug('ENS Map:', Object.fromEntries(ensMap));

      return ensMap;
    } catch (error) {
      this.logger.error(`Error fetching ENS names for addresses:`, error);
      return new Map(addresses.map(addr => [addr, null]));
    }
  }

  async getCommunityMembersWithEns(
    communityId: string,
    page: number = 1,
    limit: number = 10,
    uniqueAttesters: boolean = false
  ): Promise<AttestationResponse> {
    const data = await this.getCommunityMembers(communityId, page, limit, uniqueAttesters);
    
    // Get unique attester addresses
    const attesterAddresses = [...new Set(data.data.attestations.map(a => a.attester))];
    
    // Fetch ENS names in batch
    const ensNames = await this.getEnsNames(attesterAddresses);
    
    // Map ENS names back to attestations
    const attestersWithEns = data.data.attestations.map(attestation => ({
      ...attestation,
      ensName: ensNames.get(attestation.attester)
    }));

    return {
      data: {
        attestations: attestersWithEns
      }
    };
  }
}
