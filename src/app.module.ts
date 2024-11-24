import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankscoresModule } from './rankscores/rankscores.module';
import { ConfigModule } from '@nestjs/config';
import { CommunitiesModule } from './communities/communities.module';
import { AttestationsModule } from './attestations/attestations.module';

@Module({
  imports: [RankscoresModule, ConfigModule.forRoot(), CommunitiesModule, AttestationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
