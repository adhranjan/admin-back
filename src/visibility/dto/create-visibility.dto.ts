import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsRangedWith } from 'src/base/dto/range.dto';

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

  @IsBoolean()
  visible: boolean;
}