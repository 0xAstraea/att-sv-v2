import { Module } from '@nestjs/common';
import { RankscoresService } from './rankscores.service';
import { RankscoresController } from './rankscores.controller';

@Module({
  controllers: [RankscoresController],
  providers: [RankscoresService],
})
export class RankscoresModule {}
