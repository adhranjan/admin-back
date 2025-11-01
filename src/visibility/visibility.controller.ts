import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { VisibilityService } from './visibility.service';
import { CreateVisibilityDto } from './dto/create-visibility.dto';
import { UpdateVisibilityDto } from './dto/update-visibility.dto';

@Controller(':productCode/visibilities')
export class VisibilityController {
  constructor(private readonly visibilityService: VisibilityService) {}

  @Post()
  create(
  @Body() createVisibilityDto: CreateVisibilityDto,
  @Param('productCode') productCode: string
  ) {
    return this.visibilityService.create(createVisibilityDto, productCode);
  }

  @Get()
  findAll(@Param('productCode') productCode: string) {
    return this.visibilityService.findAll(productCode);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('productCode') productCode: string) {
    return this.visibilityService.findOne(productCode, id);
  }

  @Put(':id')
  update(@Param('id') id: string,
  @Param('productCode') productCode: string,
  @Body() updateVisibilityDto: UpdateVisibilityDto) {
    return this.visibilityService.update(productCode, id, updateVisibilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,
    @Param('productCode') productCode: string,
  ) {
    return this.visibilityService.remove(productCode, id);
  }
}
