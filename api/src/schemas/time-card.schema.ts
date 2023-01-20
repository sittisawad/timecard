import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TimeCardDocument = HydratedDocument<TimeCard>;

@Schema()
export class TimeCard {
  @Prop({ type: 'string', required: true, unique: true })
  email: string;

  @Prop({ type: 'string', required: true })
  password: string;

  @Prop({ type: 'string', required: true })
  firstName: string;

  @Prop({ type: 'string', required: true })
  lastName: string;

  @Prop({ type: Date, required: true })
  createdDate: Date;

  
  @Prop({ type: Date, required: false, default: null })
  updatedDate: Date;
}

export const TimeCardSchema = SchemaFactory.createForClass(TimeCard);
