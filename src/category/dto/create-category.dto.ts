import { IsString, IsNotEmpty, Matches, MaxLength, IsOptional, IsIn } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]{4}$/, { message: 'Code must be exactly 4 alphanumeric characters' })
  code: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^#([0-9a-fA-F]{6})$/, { message: 'Color must be a valid hex code' })
  color: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['GA', 'RS'], { message: 'Seat type must be GA or RS' })
  seatType: 'GA' | 'RS';

  @IsString()
  @IsOptional()
  @MaxLength(100)
  description?: string;
}
