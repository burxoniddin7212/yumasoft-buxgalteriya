import { IsNumber, IsNumberString } from 'class-validator';

export class DeadlineUpdateNotesDto {
  @IsNumber()
  notes_id: number;

  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;

  @IsNumberString()
  day: string;
}
