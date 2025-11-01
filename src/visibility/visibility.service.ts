import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visibility, VisibilityDocument } from './visibility.schema';
import { CreateVisibilityDto } from './dto/create-visibility.dto';
import { UpdateVisibilityDto } from './dto/update-visibility.dto';
import { Product } from 'src/products/product.schema';
import { Channel } from 'src/channel/channel.schema';
import { BASE_STATUS } from 'src/base/schema/base.schema';

@Injectable()
export class VisibilityService {
  constructor(
    @InjectModel(Visibility.name, "admin") private visibilityModel: Model<VisibilityDocument>,
    @InjectModel(Product.name ,"admin") private productModel: Model<Product>,
    @InjectModel(Channel.name,"admin") private channelModel: Model<Channel>
  ) {}

  async create(createDto: CreateVisibilityDto, productCode: string): Promise<Visibility> {
    const productExists = await this.productModel.exists({ code: productCode });
    if (!productExists) {
      throw new BadRequestException(`Product ${productCode} does not exist`);
    }

    const channelExists = await this.channelModel.exists({ code: createDto.channelCode });
    if (!channelExists) {
      throw new BadRequestException(`Channel ${createDto.channelCode} does not exist`);
    }

    const exisingVisibility = await this.visibilityModel.exists({
      channelCode: createDto.channelCode,
      productCode: productCode,
    });
    if (exisingVisibility) {
      throw new BadRequestException('Visibility for channel / product already exist');
    }

    return this.visibilityModel.create({...createDto, productCode});
  }

  async findAll(productCode: string): Promise<Visibility[]> {
    return this.visibilityModel.find({ productCode: productCode }).exec();
  }

  async findOne( productCode: string, id: string): Promise<Visibility> {
    const visibility = await this.visibilityModel.findOne({_id: id, productCode: productCode}).exec();
    if (!visibility) throw new NotFoundException('Visibility not found');
    return visibility;
  }

  async update(
    productCode: string, 
    id: string
    , dto: UpdateVisibilityDto): Promise<Visibility> {
    const visibility = await this.visibilityModel
      .findOneAndUpdate({_id: id, productCode: productCode},
         { $set: dto }, { new: true })
      .exec();

    if (!visibility) throw new NotFoundException('Visibility not found');
    return visibility;
  }

  async remove(productCode: string, id: string): Promise<Visibility> {
    const visibility = await this.visibilityModel.findOne({_id:id, productCode:productCode}).exec();
    if (!visibility) throw new NotFoundException('Visibility not found');

    if (visibility.publish?.lastSuccess) {
      throw new BadRequestException('Cannot delete a published visibility');
    }
    // TODO: check if this visibility is on any ticket types. then dont DELETE
    const updated = await this.visibilityModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { status: BASE_STATUS.deleted } },
        { new: true, upsert: true }
      )
      .exec();

    return updated;
  }
}
