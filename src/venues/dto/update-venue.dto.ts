import { PartialType } from '@nestjs/mapped-types';
import { CreateVenueDto } from './create-venue.dto';
import { IsOptional, IsString, IsNumber, IsUrl, IsIn } from 'class-validator';
import { BASE_STATUS } from 'src/base/schema/base.schema';

export class UpdateVenueDto extends PartialType(CreateVenueDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  @IsIn([BASE_STATUS.enabled, BASE_STATUS.disabled])
  status?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsUrl()
  map?: string;

  @IsOptional()
  @IsUrl()
  bannerImage?: string;

  @IsOptional()
  @IsUrl()
  cardImage?: string;
}
