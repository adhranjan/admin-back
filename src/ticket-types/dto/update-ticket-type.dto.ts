import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { IsRangedWith } from 'src/base/dto/range.dto';

export class UpdateTicketTypeDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  @IsRangedWith('minQty','maxQty')
  minQty?: number;

  @IsNumber()
  @IsOptional()
  @IsRangedWith('minQty','maxQty')
  maxQty?: number;

  @IsNumber()
  @IsOptional()
  quota?: number;

  @IsString()
  @IsOptional()
  followUpSalesAfter?: string;

  @IsBoolean()
  @IsOptional()
  complimentary?: boolean;

  @IsNumber()
  @IsOptional()
  expiryRelative?: number | null;

  @IsNumber()
  @IsOptional()
  expirySpecific?: number | null;
}
