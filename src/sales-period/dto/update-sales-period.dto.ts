import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber, IsIn } from 'class-validator';
import { IsRangedWith } from 'src/base/dto/range.dto';
import { BASE_STATUS } from 'src/base/schema/base.schema';


export class UpdateSalesPeriodDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  @IsRangedWith('endDate')
  startDate?: number;

  @IsNumber()
  @IsOptional()
  @IsRangedWith('startDate')
  endDate?: number;

  @IsNumber()
  @IsOptional()
  @IsIn([BASE_STATUS.disabled, BASE_STATUS.enabled])
  status?: number;
}
