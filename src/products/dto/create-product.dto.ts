import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  currency: string;

  @IsString()
  timeZone: string;

  @IsString()
  type: string;
}
