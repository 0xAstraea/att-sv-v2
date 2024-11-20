import { Test, TestingModule } from '@nestjs/testing';
import { RankscoresService } from './rankscores.service';

describe('RankscoresService', () => {
  let service: RankscoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RankscoresService],
    }).compile();

    service = module.get<RankscoresService>(RankscoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
