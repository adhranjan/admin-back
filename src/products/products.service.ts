import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Prevent duplicate code
    const exists = await this.productModel.findOne({ code: createProductDto.code });
    if (exists) throw new BadRequestException('Product code already exists');

    const created = new this.productModel(createProductDto);
    return created.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);
    if (!product) throw new BadRequestException('Product not found');
  
    Object.assign(product, updateProductDto);
    return product.save();
  }
    
  remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
