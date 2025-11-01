import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './product.schema';
import { randomBytes } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name, "admin") private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Prevent duplicate code
    const exists = await this.productModel.findOne({ code: createProductDto.code });
    if (exists) throw new BadRequestException('Product code already exists');

    createProductDto['encryptionKey'] = randomBytes(8).toString('hex');
    console.log(createProductDto);
    const created = await this.productModel.create(createProductDto);
    return created;
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
    return await this.productModel.findOneAndUpdate({
      _id: product._id
    }, {
      $set: updateProductDto
    })

  }
    
  remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
