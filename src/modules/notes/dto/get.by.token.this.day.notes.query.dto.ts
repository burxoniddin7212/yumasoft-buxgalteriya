import { IsIn, IsNumberString, IsString } from 'class-validator';

export class GetByTokenThisDayNotesQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsString()
  @IsIn(['true', 'false'])
  mission: string;
}
