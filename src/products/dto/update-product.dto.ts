import { IsBoolean, IsOptional, IsArray, ValidateNested, IsUrl, Allow, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class SocialMediaDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;
}

export class UpdateProductDto {
    @IsOptional()
    @IsBoolean()
    @Allow()
    stopSales?: boolean;
    
    @IsOptional()
    @IsString()
    @Allow()
    name?:string;

  @IsOptional()
  @IsUrl()
  @Allow()
  bannerImage?: string;

  @IsOptional()
  @IsUrl()
  @Allow()
  cardImage?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaDto)
  @Allow()
  socialMedia?: SocialMediaDto[];
}
