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
  async create(createDto: CreateCategoryDto): Promise<Category> {
    // Validate product exists
    const productExists = await this.productModel.exists({ code: createDto.productCode });
    if (!productExists) {
      throw new BadRequestException('Product does not exist');
    }

    const categoryExists = await this.categoryModel.exists({ 
      productCode: createDto.productCode,
      code: createDto.code
     });
    if (categoryExists) {
      throw new BadRequestException(`Category with code ${createDto.code} already exists`);
    }  

  return this.categoryModel.create(createDto);

  }

  // Get all categories
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  // Get single category by id
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  // Update category
  async update(id: string, updateDto: UpdateCategoryDto): Promise<Category> {
    // Use $set to only update provided fields
    const updatedCategory = await this.categoryModel.findOneAndUpdate(
      { _id: id },
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
  async remove(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) throw new NotFoundException('Category not found');

    if (category.publish?.lastSuccess) {
      throw new BadRequestException('Only Draft Category can be deleted.');
    }  
    await this.categoryModel.findOneAndUpdate(
      { _id: id},
      { $set: { status: BASE_STATUS.deleted} },
      { new: true }
    ).exec();

    return category;
  }
}
