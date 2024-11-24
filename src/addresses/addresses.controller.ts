import { Controller, Get, Query, Param } from '@nestjs/common';
import { AddressesService, AttestationCounts, AddressDetails } from './addresses.service';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get(':address')
  async getAddressDetails(
    @Param('address') address: string,
    @Query('communityId') communityId: string,
  ): Promise<{ data: AddressDetails }> {
    const details = await this.addressesService.getAddressDetails(address, communityId);
    return { data: details };
  }

  @Get(':address/attestations')
  async getAttestationCounts(
    @Param('address') address: string,
    @Query('communityId') communityId: string,
  ): Promise<{ data: AttestationCounts }> {
    const counts = await this.addressesService.getAttestationCounts(address, communityId);
    return { data: counts };
  }

  @Get('ens/:ensName')
  async getDetailsByEns(
    @Param('ensName') ensName: string,
    @Query('communityId') communityId: string,
  ): Promise<{ data: AddressDetails }> {
    const details = await this.addressesService.getDetailsByEns(ensName, communityId);
    return { data: details };
  }
}
