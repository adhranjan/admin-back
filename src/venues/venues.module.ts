import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { Venue, VenueSchema } from './venues.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[  MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }], "admin")],
  controllers: [VenuesController],
  providers: [VenuesService],
})
export class VenuesModule {}
