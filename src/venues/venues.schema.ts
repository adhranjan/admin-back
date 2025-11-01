import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/base/schema/base.schema';

export type VenueDocument = Venue & Document;

@Schema({ timestamps: true })
export class Venue extends BaseSchema {
  @Prop({ required: true, unique: true })
  code: string; // immutable

  @Prop({ required: true })
  name: string;

  @Prop({ type: String })
  country?: string;

  @Prop({ type: String })
  city?: string;

  @Prop({ type: String })
  address?: string;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: String })
  map?: string; // URL

  @Prop({ type: String })
  bannerImage?: string;

  @Prop({ type: String })
  cardImage?: string;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
