import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Allow } from 'class-validator';
import { IsRangedWith } from 'src/base/dto/range.dto';


export class UpdateVisibilityDto {
  @IsNumber()
  @IsOptional()
  @IsRangedWith('endDate')
  startDate?: number;

  @IsNumber()
  @IsOptional()
  @IsRangedWith('startDate')
  endDate?: number;

  @Allow()
  @IsBoolean()
  @IsOptional()
  visible?: boolean;
}