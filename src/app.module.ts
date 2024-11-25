import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankscoresModule } from './rankscores/rankscores.module';
import { ConfigModule } from '@nestjs/config';
import { CommunitiesModule } from './communities/communities.module';
import { AttestationsModule } from './attestations/attestations.module';
import { AddressesModule } from './addresses/addresses.module';
import { PcdsModule } from './pcds/pcds.module';
import { PrivyModule } from './privy/privy.module';


@Module({
  imports: [RankscoresModule, ConfigModule.forRoot(), CommunitiesModule, AttestationsModule, AddressesModule, PcdsModule, PrivyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
