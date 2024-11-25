import { Module } from '@nestjs/common';
import { PcdsService } from './pcds.service';
import { PcdsController } from './pcds.controller';
import { HandleAttestService } from './handleAttest.service';
import { PrivyModule } from 'src/privy/privy.module';

@Module({
  imports: [PrivyModule],
  controllers: [PcdsController],
  providers: [PcdsService, HandleAttestService],
  exports: [HandleAttestService],
})
export class PcdsModule {}
