import { IsString, IsNumberString, IsIn } from 'class-validator';

export class CreateNotesDto {
  @IsNumberString()
  category_id: string;

  @IsNumberString()
  sub_category_id: string;

  @IsNumberString()
  user_id: string;

  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsString()
  @IsIn(['true', 'false'])
  to_myself: string;
  
  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;

  @IsNumberString()
  day: string;
}
