import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsRangedWith } from 'src/base/dto/range.dto';
import { BASE_STATUS } from 'src/base/schema/base.schema';

export class CreateVisibilityDto {
  @IsNumber()
  @IsRangedWith('endDate')
  startDate: number;

  @IsNumber()
  @IsRangedWith('startDate')
  endDate: number;

  @IsString()
  @IsNotEmpty()
  channelCode: string;

  @IsNumber()
  @IsIn([BASE_STATUS.disabled, BASE_STATUS.enabled])
  status: number;
}