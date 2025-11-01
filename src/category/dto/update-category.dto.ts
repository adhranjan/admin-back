import { IsString, Matches, MaxLength, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @Matches(/^#([0-9a-fA-F]{6})$/, { message: 'Color must be a valid hex code' })
  color?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  description?: string;
}
