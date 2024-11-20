import { Test, TestingModule } from '@nestjs/testing';
import { RankscoresController } from './rankscores.controller';
import { RankscoresService } from './rankscores.service';

describe('RankscoresController', () => {
  let controller: RankscoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankscoresController],
      providers: [RankscoresService],
    }).compile();

    controller = module.get<RankscoresController>(RankscoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
