import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { communities } from '../../data/community';
import { EAS_CONFIG } from '../../config/config';
import { ethers } from 'ethers';

export interface AttestationCounts {
  given: number;
  received: number;
}

@Injectable()
export class AddressesService {
  private readonly logger = new Logger(AddressesService.name);

  async getAttestationCounts(address: string, communityId: string): Promise<AttestationCounts> {
    this.logger.debug(`Getting attestation counts for address ${address} in community ${communityId}`);
    
    const community = communities[communityId];
    if (!community) {
      throw new NotFoundException(`Community ${communityId} not found`);
    }

    const formattedAddress = ethers.getAddress(address);
    this.logger.debug(`Formatted address: ${formattedAddress}`);

    const baseWhereClause = {
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

    this.logger.debug('Base where clause:', JSON.stringify(baseWhereClause, null, 2));

    const [givenCount, receivedCount] = await Promise.all([
      this.getCount({ ...baseWhereClause, attester: { equals: formattedAddress } }),
      this.getCount({ ...baseWhereClause, recipient: { equals: formattedAddress } })
    ]);

    this.logger.debug(`Counts - Given: ${givenCount}, Received: ${receivedCount}`);

    return {
      given: givenCount,
      received: receivedCount
    };
  }

  private async getCount(where: any): Promise<number> {
    try {
      const response = await fetch(EAS_CONFIG.GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query AggregateAttestation($where: AttestationWhereInput) {
              aggregateAttestation(where: $where) {
                _count {
                  attester
                }
              }
            }
          `,
          variables: { where }
        }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      return data.data.aggregateAttestation._count.attester;
    } catch (error) {
      this.logger.error(`Error fetching attestation count:`, error);
      throw error;
    }
  }
}
