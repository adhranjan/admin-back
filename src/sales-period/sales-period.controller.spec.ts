import { Test, TestingModule } from '@nestjs/testing';
import { SalesPeriodController } from './sales-period.controller';
import { SalesPeriodService } from './sales-period.service';

describe('SalesPeriodController', () => {
  let controller: SalesPeriodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesPeriodController],
      providers: [SalesPeriodService],
    }).compile();

    controller = module.get<SalesPeriodController>(SalesPeriodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
