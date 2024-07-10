import { IsNumberString, IsString, IsIn } from 'class-validator';

export class GetByTokenAnyDayNotesDto {
  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;

  @IsNumberString()
  day: string;

  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsString()
  @IsIn(['true', 'false'])
  mission: string;
}
