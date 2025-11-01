import { Prop, Schema } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Schema as MongooseSchema } from 'mongoose';

export const BASE_STATUS = {
  deleted: -1,
  draft: 0,
  live: 1,
} as const;



@Schema()
export class BaseSchema {
  @Prop({ default: () => uuidv4() })
  _id: string;

  @Prop({ default: new Date().getTime() })
  createdTime: Date;

  @Prop({ default: new Date().getTime() })
  updatedTime: Date;

  @Prop({ default: 'system' })
  createdBy: string;

  @Prop({ default: 'system' })
  updatedBy: string;

  @Prop({ default: BASE_STATUS.draft })
  status: number;
  
}

// Mongoose plugin function for auto-updating timestamps
export function BaseSchemaPlugin(schema: MongooseSchema) {
    schema.pre('save', function (next) {
      const now = new Date();
      if (!this.createdTime) this.createdTime = now;
      this.updatedTime = now;
      if (!this.createdBy) this.createdBy = 'system';
      this.updatedBy = 'system';
      next();
    });
  }