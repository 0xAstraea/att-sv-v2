import { Test, TestingModule } from '@nestjs/testing';
import { PcdsController } from './pcds.controller';
import { PcdsService } from './pcds.service';

describe('PcdsController', () => {
  let controller: PcdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PcdsController],
      providers: [PcdsService],
    }).compile();

    controller = module.get<PcdsController>(PcdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
