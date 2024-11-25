import { Test, TestingModule } from '@nestjs/testing';
import { PcdsService } from './pcds.service';

describe('PcdsService', () => {
  let service: PcdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PcdsService],
    }).compile();

    service = module.get<PcdsService>(PcdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
