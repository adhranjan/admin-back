import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { TicketTypesService } from './ticket-types.service';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';

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
  @Get(':id')
  async findOne(
    @Param('productCode') productCode: string,
    @Param('id') id: string,
  ) {
    return this.service.findOne(id, productCode);
  }

  // Update a ticket type
  @Put(':id')
  async update(
    @Param('productCode') productCode: string,
    @Param('id') id: string,
    @Body() dto: UpdateTicketTypeDto,
  ) {
    return this.service.update(id, productCode, dto);
  }

  // Delete a ticket type
  @Delete(':id')
  async remove(
    @Param('productCode') productCode: string,
    @Param('id') id: string,
  ) {
    return this.service.remove(id, productCode);
  }
}
