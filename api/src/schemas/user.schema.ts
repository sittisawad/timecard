import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({ type: 'string', required: true, unique: true })
  email: string;

  @Prop({ type: 'string', required: true })
  password: string;

  @Prop({ type: 'string', required: true })
  firstName: string;

  @Prop({ type: 'string', required: true })
  lastName: string;

  @Prop({ type: 'boolean', required: false, default: false })
  isAdmin: boolean;

  @Prop({ type: Date, required: true })
  createdDate: Date;

  @Prop({ type: Date, required: false, default: null })
  updatedDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
