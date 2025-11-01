import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';
import { Product, ProductDocument } from 'src/products/product.schema';
import { TicketType, TicketTypeDocument } from './ticket-types.schema';
import { BASE_STATUS } from 'src/base/schema/base.schema';
import { Category, CategoryDocument } from 'src/category/category.schema';

@Injectable()
export class TicketTypesService {
  constructor(
    @InjectModel(TicketType.name, "admin") private ticketTypeModel: Model<TicketTypeDocument>,
    @InjectModel(Product.name, "admin") private productModel: Model<ProductDocument>,
    @InjectModel(Category.name, "admin") private categoryModel: Model<CategoryDocument>,

    ) {}

  // Create a new ticket type
  async create(dto: CreateTicketTypeDto & { productCode: string }): Promise<TicketType> {
    // Ensure product exists
    const product = await this.productModel.findOne({
      code:dto.productCode
    });
    if (!product) throw new BadRequestException('Product does not exist');

    const category = await this.categoryModel.findOne({
      code: dto.category,
      productCode: dto.productCode,
    })

    if (!category) throw new BadRequestException('Category does not exist');
    const cleanDto = await this.prepareTicketTypeData(dto.productCode, dto,dto.code);

    const created = new this.ticketTypeModel(cleanDto);
    return created.save();
  }

  // Find all ticket types for a product
  async findAll(productCode: string): Promise<TicketType[]> {
    return this.ticketTypeModel.find({ productCode }).exec();
  }

  // Find a single ticket type by ID and productCode
  async findOne(id: string, productCode: string): Promise<TicketType> {
    const ticket = await this.ticketTypeModel.findOne({ _id: id, productCode });
    if (!ticket) throw new NotFoundException('Ticket type not found');
    return ticket;
  }

  // Update a ticket type
  async update(id: string, productCode: string, updateDto: UpdateTicketTypeDto): Promise<TicketType> {
    const ticketTypeConfig = await this.ticketTypeModel.findOne(
      { _id: id, productCode },
    );

    if (!ticketTypeConfig) throw new NotFoundException('Ticket type not found');

    const cleanDto = await this.prepareTicketTypeData(productCode, updateDto, ticketTypeConfig.code);
      console.log(cleanDto);
    const updated = await this.ticketTypeModel.findOneAndUpdate(
      { _id: id, productCode },
      cleanDto,
      { new: true },
    );

    if (!updated) throw new NotFoundException('Ticket type not found');
    return updated;
  }

  // Delete a ticket type
  async remove(id: string, productCode: string): Promise<TicketType> {
    const ticketType = await this.ticketTypeModel.findOne({
      _id: id, productCode: productCode
    }).exec();
    if (!ticketType) throw new NotFoundException('Ticket Type not found');
    
    if (ticketType.publish?.lastSuccess) {
      throw new BadRequestException('Only Draft Sales Period can be deleted.');
    }  
    return await this.ticketTypeModel.findOneAndUpdate(
      { _id: id},
      { $set: { status: BASE_STATUS.deleted} },
      { new: true , upsert: true}
    ).exec();
  }


  async prepareTicketTypeData(
    productCode: string,
    data: CreateTicketTypeDto | UpdateTicketTypeDto,
    currentTTCode?: string, // for update cases
  ): Promise<any> {
    const cleanedData = { ...data };
      if (cleanedData.followUpSalesAfter) {
      if (currentTTCode && cleanedData.followUpSalesAfter === currentTTCode) {
        throw new BadRequestException(`A ticket type cannot follow up itself`);
      }

      const target = await this.ticketTypeModel.findOne({
        _id: cleanedData.followUpSalesAfter,
        productCode,
      });
  
      if (!target) {
        throw new BadRequestException(
          `Invalid followUpSalesAfter: ticket type not found for this product (${productCode})`,
        );
      }
    }
    const hasRelative = 'expiryRelative' in cleanedData && cleanedData.expiryRelative !== null;
    const hasSpecific = 'expirySpecific' in cleanedData && cleanedData.expirySpecific !== null;
  
    if (hasRelative && hasSpecific) {
      throw new BadRequestException(
        `Only one of expiryRelative or expirySpecific can be set.`,
      );
    }
  
    if (hasRelative) {
      cleanedData.expirySpecific = null;
    } else if (hasSpecific) {
      cleanedData.expiryRelative = null;
    }
    return cleanedData;
  }

  
}
