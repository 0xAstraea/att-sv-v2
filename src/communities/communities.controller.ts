import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { AttestationResponse } from './types';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get('members')
  async getCommunityMembers(
    @Query('communityId') communityId: string,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ): Promise<AttestationResponse> {
    return this.communitiesService.getCommunityMembers(communityId, page, limit);
  }
}
