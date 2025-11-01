import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { Venue, VenueDocument } from './venues.schema';

@Injectable()
export class VenuesService {
  constructor(@InjectModel(Venue.name, "admin") private venueModel: Model<VenueDocument>) {}

  async create(dto: CreateVenueDto): Promise<Venue> {
    const exists = await this.venueModel.findOne({ code: dto.code });
    if (exists) throw new BadRequestException('Venue code already exists');
    return await this.venueModel.create(dto);
  }

  async findAll(): Promise<Venue[]> {
    return await this.venueModel.find();
  }

  async findOne(id: string): Promise<Venue> {
    const venue = await this.venueModel.findById(id).exec();
    if (!venue) throw new NotFoundException('Venue not found');
    return venue;
  }

  async update(id: string, dto: UpdateVenueDto): Promise<Venue> {
    const venue = await this.venueModel.findById(id).exec();
    if (!venue) throw new NotFoundException('Venue not found');

    console.log(dto, id);
    return await this.venueModel.findOneAndUpdate(
      { _id: id},
      { $set:  dto },
      { new: true , upsert: true}
    ).exec();
  }
}
