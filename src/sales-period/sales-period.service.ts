import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSalesPeriodDto } from './dto/create-sales-period.dto';
import { UpdateSalesPeriodDto } from './dto/update-sales-period.dto';
import { SalesPeriod, SalesPeriodDocument } from './sales-period.schema';
import { Product, ProductDocument } from 'src/products/product.schema';
import { BASE_STATUS } from 'src/base/schema/base.schema';

@Injectable()
export class SalesPeriodService {
  constructor(
    @InjectModel(SalesPeriod.name, "admin") private salesPeriodModel: Model<SalesPeriodDocument>,
    @InjectModel(Product.name, "admin") private productModel: Model<ProductDocument>,
  ) {}

  private async ensureProductExists(productCode: string) {
    const product = await this.productModel.findOne({ code: productCode });
    if (!product) throw new NotFoundException(`Product with code ${productCode} not found`);
  }

  async create(productCode: string, dto: CreateSalesPeriodDto): Promise<SalesPeriod> {
    await this.ensureProductExists(productCode);
    const created = new this.salesPeriodModel({ ...dto, productCode });
    return created.save();
  }

  async findAll(productCode: string): Promise<SalesPeriod[]> {
    return this.salesPeriodModel.find({ productCode }).exec();
  }

  async findOne(id: string, productCode: string): Promise<SalesPeriod> {
    const record = await this.salesPeriodModel.findOne({ _id: id, productCode });
    if (!record) throw new NotFoundException('Sales period not found');
    return record;
  }

  async update(id: string, productCode: string, dto: UpdateSalesPeriodDto): Promise<SalesPeriod> {    
    const record = await this.salesPeriodModel.findOneAndUpdate(
      { _id: id, productCode },
      dto,
      { new: true },
    );

    if (!record) throw new NotFoundException('Sales period not found');
    return record;
  }

  async remove(id: string, productCode: string): Promise<SalesPeriod> {
    const salesPeriod = await this.salesPeriodModel.findOne({
      _id: id, productCode: productCode
    }).exec();
    if (!salesPeriod) throw new NotFoundException('Sales Period not found');
    
    if (salesPeriod.publish?.lastSuccess) {
      throw new BadRequestException('Only Draft Sales Period can be deleted.');
    }  
    return await this.salesPeriodModel.findOneAndUpdate(
      { _id: id},
      { $set: { status: BASE_STATUS.deleted} },
      { new: true , upsert: true}
    ).exec();
    }
}
