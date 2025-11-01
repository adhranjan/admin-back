import { Test, TestingModule } from '@nestjs/testing';
import { SalesPeriodService } from './sales-period.service';

describe('SalesPeriodService', () => {
  let service: SalesPeriodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesPeriodService],
    }).compile();

    service = module.get<SalesPeriodService>(SalesPeriodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
