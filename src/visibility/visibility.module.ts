import { Module } from '@nestjs/common';
import { VisibilityService } from './visibility.service';
import { VisibilityController } from './visibility.controller';
import { Visibility, VisibilitySchema } from './visibility.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/product.schema';
import { Channel, ChannelSchema } from 'src/channel/channel.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Visibility.name, schema: VisibilitySchema },
      { name: Product.name, schema: ProductSchema },
      { name: Channel.name, schema: ChannelSchema }
    
    ], "admin")
  ],
  controllers: [VisibilityController],
  providers: [VisibilityService],
})
export class VisibilityModule {}
