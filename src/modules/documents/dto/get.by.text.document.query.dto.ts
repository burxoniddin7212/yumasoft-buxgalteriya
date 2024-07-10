import { IsString, IsNumberString } from 'class-validator';

export class GetByTextDocumentsQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsString()
  text: string;
}
