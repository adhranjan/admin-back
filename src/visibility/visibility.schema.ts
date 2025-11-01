import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/base/schema/base.schema';
import { HasStartEndDate, WithStartEndDate } from 'src/base/schema/dateRange.schema';
import { Publishable } from 'src/base/schema/publishable';

export type VisibilityDocument = Visibility & Document & Publishable & HasStartEndDate;

@Schema({timestamps: true})
@Publishable()
@WithStartEndDate()
export class Visibility extends BaseSchema {
  @Prop({ required: true })
  channelCode: string;

  @Prop({ required: true })
  productCode: string;
}

export const VisibilitySchema = SchemaFactory.createForClass(Visibility);
