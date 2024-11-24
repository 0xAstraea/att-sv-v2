import { Controller, Get, Query, Param } from '@nestjs/common';
import { AddressesService, AttestationCounts } from './addresses.service';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get(':address/attestations')
  async getAttestationCounts(
    @Param('address') address: string,
    @Query('communityId') communityId: string,
  ): Promise<{ data: AttestationCounts }> {
    const counts = await this.addressesService.getAttestationCounts(address, communityId);
    return { data: counts };
  }
}
