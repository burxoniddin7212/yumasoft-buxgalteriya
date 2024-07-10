import { IsIn, IsNumberString, IsString } from 'class-validator';

export class GetAllNotesQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsString()
  @IsIn(['active', 'delete'])
  status: string;

  @IsString()
  @IsIn(['true', 'false'])
  mission: string;
}
