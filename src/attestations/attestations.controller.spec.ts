import { Test, TestingModule } from '@nestjs/testing';
import { AttestationsController } from './attestations.controller';
import { AttestationsService } from './attestations.service';

describe('AttestationsController', () => {
  let controller: AttestationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttestationsController],
      providers: [AttestationsService],
    }).compile();

    controller = module.get<AttestationsController>(AttestationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
