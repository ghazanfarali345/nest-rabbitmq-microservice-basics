import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class newFilmDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  director: string;

  @IsString()
  release_year: string;

  @IsArray()
  actors: string[];
}
