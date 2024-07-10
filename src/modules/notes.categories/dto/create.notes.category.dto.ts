import { Length, IsString } from 'class-validator';

export class CreateNotesCategoryDto {
  @IsString()
  @Length(3, 30)
  name: string;
}
