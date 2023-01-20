import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({ type: 'string', required: true, unique: true })
  email: string;

  @Prop({ type: 'string', required: true })
  firstName: string;

  @Prop({ type: 'string', required: true })
  lastName: string;

  @Prop({ type: Date, required: true })
  createdDate: Date;

  @Prop({ type: Date, required: false, default: null })
  updatedDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
