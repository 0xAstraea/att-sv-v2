import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrivyService } from './privy.service';
import { PrivyGuard } from './privy.guard';

@Module({
  imports: [ConfigModule],
  providers: [PrivyService, PrivyGuard],
  exports: [PrivyService, PrivyGuard],
})
export class PrivyModule {}