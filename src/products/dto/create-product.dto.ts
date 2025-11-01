import { IsString, Length } from 'class-validator';

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
  type: string;
}
