import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AttestationsService } from './attestations.service';
import { AttestationsController } from './attestations.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AttestationsController],
  providers: [AttestationsService],
})
export class AttestationsModule {}
