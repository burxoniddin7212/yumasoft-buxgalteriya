import { IsString, IsNumber } from 'class-validator';

export class UpdateNotesDto {
  @IsNumber()
  notes_id: number;

  @IsString()
  title: string;

  @IsString()
  text: string;
}
