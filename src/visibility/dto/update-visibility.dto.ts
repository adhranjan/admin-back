import { IsBoolean, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Allow } from 'class-validator';
import { IsRangedWith } from 'src/base/dto/range.dto';
import { BASE_STATUS } from 'src/base/schema/base.schema';


export class UpdateVisibilityDto {
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