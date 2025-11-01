import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  BaseSchema } from 'src/base/schema/base.schema';
import { CHANNEL_CART_STATUS, CHANNEL_TYPE } from './channels.constans';

export type ChannelDocument = Channel & Document;


@Schema({ timestamps: true })
export class Channel extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, enum: [CHANNEL_TYPE.POS, CHANNEL_TYPE.PORTAL] })
  type: string;

  @Prop({ required: true })
  country: string;

  @Prop({ default: null })
  domain?: string;

  @Prop({ default: CHANNEL_CART_STATUS.disabled })
  shoppingCart: number;

  @Prop({ default: 10 })
  cartTimer: number;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
