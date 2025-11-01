import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/base/schema/base.schema';
import { Publishable } from 'src/base/schema/publishable';

export type TicketTypeDocument = TicketType & Document & Publishable;

@Schema({ timestamps: true })
@Publishable()
export class TicketType extends BaseSchema {
  @Prop({ required: true, length: 4 })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, immutable: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  minQty?: number;

  @Prop()
  maxQty?: number;

  @Prop({ required: true })
  quota: number;

  @Prop({ default: null })
  followUpSalesAfter: string;

  @Prop({ default: false })
  complimentary: boolean;

  @Prop({ required: true })
  productCode: string;

  //These are for passes.
  @Prop({ type: Number, default: null })
  expiryRelative?: number | null;

  @Prop({ type: Number, default: null })
  expirySpecific?: number | null;
}

export const TicketTypeSchema = SchemaFactory.createForClass(TicketType);
