import { IsString, IsNotEmpty, Length, IsNumber, IsOptional, IsBoolean, IsDefined } from 'class-validator';
import { IsRangedWith } from 'src/base/dto/range.dto';

export class CreateTicketTypeDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 4)
  code: string; // only on create

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string; // fixed on create

  @IsNumber()
  price: number;

  @IsNumber()
  @IsRangedWith('minQty', 'maxQty')
  minQty: number;

  @IsNumber()
  @IsRangedWith('minQty', 'maxQty')
  maxQty: number;

  @IsNumber()
  quota: number;

  @IsString()
  @IsOptional()
  followUpSalesAfter?: string;

  @IsBoolean()
  @IsDefined()
  complimentary?: boolean;

  @IsNumber()
  @IsOptional()
  expiryRelative?: number | null;

  @IsNumber()
  @IsOptional()
  expirySpecific?: number | null;
}
