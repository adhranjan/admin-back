import { IsIn, IsString, Length } from 'class-validator';
import { PRODUCT_TYPE } from '../products.constants';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @Length(8, 8, { message: 'Code must be exactly 8 characters long' })
  code: string;

  @IsString()
  currency: string;

  @IsString()
  timeZone: string;

  @IsString()
  @IsIn([PRODUCT_TYPE.EVENT, PRODUCT_TYPE.PASS], { message: `Only ${PRODUCT_TYPE.EVENT} and ${PRODUCT_TYPE.PASS} are supported.` })
  type: string;
}
