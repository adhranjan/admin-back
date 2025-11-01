import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 8, { message: 'Code must be exactly 8 characters long' })
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}