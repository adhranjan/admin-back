import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Product, ProductDocument } from 'src/products/product.schema';
import { Category, CategoryDocument } from './category.schema';
import { BASE_STATUS } from 'src/base/schema/base.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name, "admin") private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name, "admin") private readonly productModel: Model<ProductDocument>, // for validation
  ) {}

  // Create category
  async create(productCode: string, createDto: CreateCategoryDto): Promise<Category> {
    // Validate product exists
    const productExists = await this.productModel.exists({ code: productCode });
    if (!productExists) {
      throw new BadRequestException('Product does not exist');
    }

    const categoryExists = await this.categoryModel.exists({ 
      productCode: productCode,
      code: createDto.code
     });
    if (categoryExists) {
      throw new BadRequestException(`Category with code ${createDto.code} already exists`);
    }  

  return this.categoryModel.create({...createDto, productCode});

  }

  // Get all categories
  async findAll(productCode: string): Promise<Category[]> {
    return this.categoryModel.find({
      productCode 
    }).exec();
  }

  // Get single category by id
  async findOne(productCode: string, code: string): Promise<Category> {
    const category = await this.categoryModel.findOne({productCode, code}).exec();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  // Update category
  async update(productCode: string, code: string, updateDto: UpdateCategoryDto): Promise<Category> {
    // Use $set to only update provided fields
    const updatedCategory = await this.categoryModel.findOneAndUpdate(
      { productCode: productCode, code:code },
      { $set: updateDto },
      { new: true }, // return the updated document
    ).exec();

    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }
    console.log(updatedCategory.publish);

    return updatedCategory;
  }  
 
  // Delete category
  async remove(productCode: string,code: string): Promise<Category> {
    const category = await this.categoryModel.findOne({code, productCode}).exec();
    if (!category) throw new NotFoundException('Category not found');

    if (category.publish?.lastSuccess) {
      throw new BadRequestException('Only Draft Category can be deleted.');
    }  
    await this.categoryModel.findOneAndUpdate(
      { _id: category._id },
      { $set: { status: BASE_STATUS.deleted} },
      { new: true }
    ).exec();

    return category;
  }
}
