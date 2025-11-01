import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomBytes } from 'crypto';
import { BaseSchema } from 'src/base/schema/base.schema';
import { Publishable } from 'src/base/schema/publishable';

export type ProductDocument = Product & Document & Publishable;

@Schema({ timestamps: true })
@Publishable()
export class Product extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  timeZone: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  encryptionKey: string;

  @Prop({ default: false })
  stopSales: boolean;

  @Prop({ type: String })
  bannerImage?: string;

  @Prop({ type: String })
  cardImage?: string;

  @Prop({
    type: [
      {
        name: { type: String },
        url: { type: String },
      },
    ],
    _id: false,
    default: [],
  })
  socialMedia: { name: string; url: string }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);