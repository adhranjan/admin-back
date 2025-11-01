import { Module } from '@nestjs/common';
import { SalesPeriodService } from './sales-period.service';
import { SalesPeriodController } from './sales-period.controller';
import { SalesPeriod, SalesPeriodSchema } from './sales-period.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/product.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: SalesPeriod.name, schema: SalesPeriodSchema },
      { name: Product.name, schema: ProductSchema },
    ], "admin")
  ],
  controllers: [SalesPeriodController],
  providers: [SalesPeriodService],
})
export class SalesPeriodModule {}
