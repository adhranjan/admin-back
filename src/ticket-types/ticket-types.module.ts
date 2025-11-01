import { Module } from '@nestjs/common';
import { TicketTypesService } from './ticket-types.service';
import { TicketTypesController } from './ticket-types.controller';
import { TicketType, TicketTypeSchema } from './ticket-types.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/product.schema';
import { Category, CategorySchema } from 'src/category/category.schema';
import { Channel } from 'diagnostics_channel';
import { ChannelSchema } from 'src/channel/channel.schema';
import { SalesPeriod, SalesPeriodSchema } from '../sales-period/sales-period.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: TicketType.name, schema: TicketTypeSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Channel.name, schema: ChannelSchema },
      { name: SalesPeriod.name, schema: SalesPeriodSchema },
    ], "admin")
  ],
  controllers: [TicketTypesController],
  providers: [TicketTypesService],
})
export class TicketTypesModule {}
