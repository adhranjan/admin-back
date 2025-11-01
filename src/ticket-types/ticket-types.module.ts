import { Module } from '@nestjs/common';
import { TicketTypesService } from './ticket-types.service';
import { TicketTypesController } from './ticket-types.controller';
import { TicketType, TicketTypeSchema } from './ticket-types.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/product.schema';
import { Category, CategorySchema } from 'src/category/category.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: TicketType.name, schema: TicketTypeSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
    ], "admin")
  ],
  controllers: [TicketTypesController],
  providers: [TicketTypesService],
})
export class TicketTypesModule {}
