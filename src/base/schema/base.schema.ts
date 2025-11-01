import { Prop, Schema } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Schema as MongooseSchema } from 'mongoose';

export const BASE_STATUS = {
  deleted: -1,
  disabled: 0,
  enabled: 1,
} as const;


@Schema()
export class BaseSchema {

  @Prop({ default: () => uuidv4() })
  _id: string;


  @Prop({ default: 'system' })
  createdBy: string;

  @Prop({ default: 'system' })
  updatedBy: string;

  @Prop({ default: BASE_STATUS.enabled })
  status: number;
    
}

// Mongoose plugin function for auto-updating timestamps
export function BaseSchemaPlugin(schema: MongooseSchema) {
    schema.pre('save', function (next) {
      const now = new Date();
      if (!this.createdBy) this.createdBy = 'system';
      this.updatedBy = 'system';
      next();
    });
  }