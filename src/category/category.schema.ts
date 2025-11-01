import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/base/schema/base.schema';
import { Publishable } from 'src/base/schema/publishable';


export type CategoryDocument = Category & Document & Publishable;

@Schema({ timestamps: true })
@Publishable()
export class Category extends BaseSchema { 
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    match: /^[a-zA-Z0-9]{4}$/,
  })
  code: string;

  @Prop({
    required: true,
    match: /^#([0-9a-fA-F]{6})$/,
  })
  color: string;

  @Prop({ required: true, enum: ['GA', 'RS'] })
  seatType: 'GA' | 'RS';

  @Prop({ maxlength: 100 })
  description?: string;

  @Prop({ required: true })
  productCode: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);