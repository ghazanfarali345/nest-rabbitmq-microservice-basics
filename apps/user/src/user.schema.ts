import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocumentType = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  location: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
