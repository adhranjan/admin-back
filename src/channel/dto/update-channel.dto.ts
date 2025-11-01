import { IsString, IsOptional, IsUrl, IsIn, IsNumber, Min } from 'class-validator';
import { BASE_STATUS } from 'src/base/schema/base.schema';
import { CHANNEL_CART_STATUS } from '../channels.constans';

export class UpdateChannelDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsUrl()
  domain?: string;

  @IsOptional()
  @IsIn([BASE_STATUS.enabled, BASE_STATUS.disabled])
  status?: number;

  @IsOptional()
  @IsIn([CHANNEL_CART_STATUS.disabled, CHANNEL_CART_STATUS.enabled])
  shoppingCart?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  cartTimer?: number; // in minutes
}
