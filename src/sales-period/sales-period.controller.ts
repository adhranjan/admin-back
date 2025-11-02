import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Put } from '@nestjs/common';
import { SalesPeriodService } from './sales-period.service';
import { CreateSalesPeriodDto } from './dto/create-sales-period.dto';
import { UpdateSalesPeriodDto } from './dto/update-sales-period.dto';

@Controller(':productCode/salesPeriod')
export class SalesPeriodController {
  constructor(private readonly service: SalesPeriodService) {}

  // Create a new sales period
  @Post()
  async create(
    @Param('productCode') productCode: string,
    @Body() dto: CreateSalesPeriodDto,
  ) {
    return this.service.create(productCode, dto);
  }

  @Get()
  async findAll(@Param('productCode') productCode: string) {
    return this.service.findAll(productCode);
  }

  @Get(':id')
  async findOne(
    @Param('productCode') productCode: string,
    @Param('id') id: string,
  ) {
    return this.service.findOne(id, productCode);
  }

  @Put(':id')
  async update(
    @Param('productCode') productCode: string,
    @Param('id') id: string,
    @Body() dto: UpdateSalesPeriodDto,
  ) {
    return this.service.update(id, productCode, dto);
  }

  @Delete(':id')
  async remove(
    @Param('productCode') productCode: string,
    @Param('id') id: string,
  ) {
    return this.service.remove(id, productCode);
  }
}
