import { Prop } from '@nestjs/mongoose';
export function Publishable(): ClassDecorator {
  return (target: any) => {
    Prop({
      type: {
        lastSuccess: { type: Date, default: null },
        error: { type: String, default: null },
        _id: false,
      },
      default: { },
    })(target.prototype, 'publish');
  };
}
export interface Publishable {
  publish: {
    lastSuccess: string | null;
    error: string | null;
  };
}
