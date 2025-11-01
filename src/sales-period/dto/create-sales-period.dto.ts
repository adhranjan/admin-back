import { IsString, IsNotEmpty, IsNumber, IsIn, IsDefined } from 'class-validator';
import { IsRangedWith } from 'src/base/dto/range.dto';
import { BASE_STATUS } from 'src/base/schema/base.schema';


export class CreateSalesPeriodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsDefined()
  @IsRangedWith('startDate','endDate')
  startDate: number;

  @IsNumber()
  @IsDefined()
  @IsRangedWith('startDate','endDate')
  endDate: number;

  @IsNumber()
  @IsIn([BASE_STATUS.disabled, BASE_STATUS.enabled])
  status: number;
}
