import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export function WithStartEndDate(): ClassDecorator {
  return (target: any) => {
    // startDate
    Prop({ type: Number, required: false })(target.prototype, 'startDate');
    IsNumber()(target.prototype, 'startDate');
    IsOptional()(target.prototype, 'startDate');
    Type(() => Number)(target.prototype, 'startDate');

    // endDate
    Prop({ type: Number, required: false })(target.prototype, 'endDate');
    IsNumber()(target.prototype, 'endDate');
    IsOptional()(target.prototype, 'endDate');
    Type(() => Number)(target.prototype, 'endDate');
  };
}

export interface HasStartEndDate {
  startDate?: number;
  endDate?: number;
}
