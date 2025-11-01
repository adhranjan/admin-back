import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller(':productCode/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
    @Param('productCode') productCode: string,
    @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(productCode,createCategoryDto);
  }

  @Get()
  findAll(
    @Param('productCode') productCode: string,
  ) {
    return this.categoryService.findAll(productCode);
  }

  @Get(':id')
  async findOne(
    @Param('productCode') productCode: string,
    @Param('id') id: string,
  ) {
    return this.categoryService.findOne(id, productCode);
  }

  @Put(':id')
  update(
    @Param('productCode') productCode: string,
    @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(productCode, id, updateCategoryDto);
  }

  @Delete(':id')
  remove(
    @Param('productCode') productCode: string,
    @Param('id') id: string) {
    return this.categoryService.remove(productCode,id);
  }
}
