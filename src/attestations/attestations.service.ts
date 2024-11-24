import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { Utils } from 'alchemy-sdk';
import { communities } from '../../data/community';
import { EAS_CONFIG } from '../../config/config';
@Injectable()
export class AttestationsService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;

  constructor(private configService: ConfigService) {
    const alchemyUrl = this.configService.get<string>('ALCHEMY_URL');
    const privateKey = this.configService.get<string>('PRIVATE_KEY');

    if (!alchemyUrl || !privateKey) {
      throw new Error('Missing required environment variables');
    }

    this.provider = new ethers.JsonRpcProvider(alchemyUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
  }

  async createAttestation(data: { 
    communityId: string;
    recipient: string; 
    attester: string; 
    signature: string;
  }) {
    const { communityId, recipient, attester, signature } = data;

    // Validate attester and recipient
    if (attester.toLowerCase() === recipient.toLowerCase()) {
      throw new BadRequestException("Error: You cannot vouch for yourself.");
    }

    // Get community information
    const communityInfo = communities[communityId];
    if (!communityInfo) {
      throw new BadRequestException(`Invalid community ID: ${communityId}`);
    }

    const { category, subcategory, platform } = communityInfo;

    // Create attestation
    try {
      const eas = new EAS(EAS_CONFIG.EAS_CONTRACT_ADDRESS); //verifyingContract
      await eas.connect(this.signer);

      const schemaEncoder = new SchemaEncoder("bytes32 platform,bytes32 category,bytes32 subCategory");
      const encodedData = schemaEncoder.encodeData([
        { name: "platform", value: ethers.encodeBytes32String(platform), type: "bytes32" },
        { name: "category", value: ethers.encodeBytes32String(category), type: "bytes32" },
        { name: "subCategory", value: ethers.encodeBytes32String(subcategory), type: "bytes32" }
      ]);

      const expandedSig = Utils.splitSignature(signature);

      const transaction = await eas.attestByDelegation({
        schema: EAS_CONFIG.VOUCH_SCHEMA, //schemaId
        data: {
          recipient: recipient,
          expirationTime: BigInt(0),
          revocable: true,
          refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
          data: encodedData
        },
        signature: expandedSig,
        attester: attester,
        deadline: BigInt(0)
      });

      const newAttestationUID = await transaction.wait();
      console.log('New attestation UID:', newAttestationUID);

      return newAttestationUID;
    } catch (error) {
      console.error('Attestation error:', error);
      throw new BadRequestException('Failed to create attestation');
    }
  }
}
