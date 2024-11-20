import { Controller, Get, Query } from '@nestjs/common';
import { RankscoresService } from './rankscores.service';

@Controller('rankscores')
export class RankscoresController {
  constructor(private readonly rankscoresService: RankscoresService) {}

  @Get()
  async getAllScores() {
    return this.rankscoresService.calculateRankScores();
  }

  @Get('top')
  async getTopTrusted(@Query('limit') limit: number = 10) {
    return this.rankscoresService.getTopTrustedAddresses(limit);
  }
}