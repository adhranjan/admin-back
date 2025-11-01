import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
@Schema()
export class BaseSchema {
  @Prop({ default: new Date().getTime() })
  createdTime: Date;

  @Prop({ default: new Date().getTime() })
  updatedTime: Date;

  @Prop({ default: 'system' })
  createdBy: string;

  @Prop({ default: 'system' })
  updatedBy: string;

  @Prop({ default: "draft" })
  status: Date;
  
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