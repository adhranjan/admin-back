import { IsString, IsBoolean, IsOptional, IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SalesPeriodEntries {
  @IsString()
  channelCode: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  salesPeriodId: string;
}

export class PatchItemDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => SalesPeriodEntries)
  sales?: SalesPeriodEntries;

  @IsIn(['add', 'update', 'delete'])
  action: 'add' | 'update' | 'delete';
}

export class PatchTicketTypesDto {
  @ValidateNested({ each: true })
  @Type(() => PatchItemDto)
  body: PatchItemDto[];
}
