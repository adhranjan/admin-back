import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './category.schema';
import { Product, ProductSchema } from 'src/products/product.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema }
    ], "admin")
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
