import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel, ChannelDocument } from './channel.schema';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name, "admin")
    private channelModel: Model<ChannelDocument>,
  ) {}

  /**
   * CREATE: generates unique code if needed, validates duplicates
   */
  async create(createChannelDto: CreateChannelDto): Promise<Channel> {
    // Ensure the generated code is unique
    const existing = await this.channelModel.findOne({ code: createChannelDto.code }).exec();
    if (existing) {
      throw new BadRequestException('Generated code already exists, please retry.');
    }
    const created = await this.channelModel.create(createChannelDto);
    return created;
  }

  /**
   * READ: all channels
   */
  async findAll(): Promise<Channel[]> {
    return this.channelModel.find().exec();
  }

  /**
   * UPDATE: validates if record exists
   */
  async update(code: string, updateChannelDto: UpdateChannelDto): Promise<ChannelDocument> {
    const existing = await this.channelModel.findOne({code}).exec();
    if (!existing) {
      throw new NotFoundException(`Channel with code ${code} not found`);
    }
    const updated = await this.channelModel.findOneAndUpdate({code: code}, {
      $set: updateChannelDto
    }, {
      upsert: true,
      new: true,
    });

    return updated;
  }

  findOne(code: string) {
    return this.channelModel.findOne({code}).exec();
  }
}
