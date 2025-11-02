import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { TicketTypesService } from './ticket-types.service';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';
import { PatchTicketTypesDto } from './dto/patch-ticket-type.dto';

@Controller(':productCode/ticket-types')
export class TicketTypesController {
  constructor(private readonly service: TicketTypesService) {}

  // Create a new ticket type
  @Post()
  async create(
    @Param('productCode') productCode: string,
    @Body() dto: CreateTicketTypeDto,
  ) {
    // Attach productCode to DTO before creation
    return this.service.create({ ...dto, productCode });
  }

  // Get all ticket types for a product
  @Get()
  async findAll(@Param('productCode') productCode: string) {
    return this.service.findAll(productCode);
  }

  // Get a single ticket type by ID
  @Get(':code')
  async findOne(
    @Param('productCode') productCode: string,
    @Param('code') code: string,
  ) {
    return this.service.findOne(code, productCode);
  }

  // Update a ticket type
  @Put(':code')
  async update(
    @Param('productCode') productCode: string,
    @Param('code') code: string,
    @Body() dto: UpdateTicketTypeDto,
  ) {
    return this.service.update(code, productCode, dto);
  }


  @Patch(':code/sales')
  async patchSales(
    @Param('productCode') productCode: string,
    @Param('code') code: string,
    @Body() patchDto: PatchTicketTypesDto,
  ) {

    if (!patchDto.body || !patchDto.body.length) {
      throw new BadRequestException('Body must contain at least one sales item');
    }
    const ticketTypes = await this.service.patchSales(productCode, code, patchDto.body);
    return ticketTypes
  }
  // Delete a ticket type
  @Delete(':code')
  async remove(
    @Param('productCode') productCode: string,
    @Param('code') code: string,
  ) {
    return this.service.remove(code, productCode);
  }
}
