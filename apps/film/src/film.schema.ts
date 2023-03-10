import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocumentType = Film & Document;

@Schema({ versionKey: false })
export class Film {
  @Prop()
  title: string;

  @Prop()
  userId: string;

  @Prop()
  director: string;

  @Prop()
  release_year: string;

  @Prop()
  actors: string[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
