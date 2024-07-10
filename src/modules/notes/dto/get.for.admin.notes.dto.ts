import { IsIn, IsString, IsNumberString } from 'class-validator';

export class GetForAdminNotesDto {
  @IsNumberString()
  user_id: string;

  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsString()
  @IsIn(['true', 'false'])
  mission: string;
}
