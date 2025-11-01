import { IsString, IsNotEmpty, IsIn, Length } from 'class-validator';

export class CreateChannelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(8, 8, { message: 'Code must be exactly 8 characters long' })
  code: string;

  @IsString()
  @IsIn(['POS', 'PORTAL'])
  type: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}