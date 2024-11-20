import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankscoresModule } from './rankscores/rankscores.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RankscoresModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
