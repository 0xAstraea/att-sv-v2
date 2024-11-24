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
  ): Promise<AttestationResponse> {
    const community = communities[communityId];
    if (!community) {
      throw new NotFoundException(`Community ${communityId} not found`);
    }

    const skip = (page - 1) * limit;

    const whereClause = {
      AND: [
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
    };

    const queryBody = {
      query: `
        query GetAttestations($where: AttestationWhereInput!, $take: Int!, $skip: Int!) {
          attestations(where: $where, take: $take, skip: $skip) {
            recipient
            attester
          }
        }
      `,
      variables: {
        where: whereClause,
        take: limit,
        skip: skip
      }
    };

    // Log the query for debugging
    this.logger.debug('GraphQL Query:', JSON.stringify(queryBody, null, 2));

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
        this.logger.error('GraphQL Error Response:', errorText);
        throw new Error(`GraphQL request failed: ${response.statusText}. Details: ${errorText}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        this.logger.error('GraphQL Errors:', JSON.stringify(data.errors, null, 2));
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      return data;
    } catch (error) {
      this.logger.error('Error in getCommunityMembers:', error);
      throw error;
    }
  }
}
