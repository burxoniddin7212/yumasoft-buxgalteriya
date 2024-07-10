import { IsString, IsNumberString, IsIn } from 'class-validator';

export class GetAllDocumentsQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsString()
  @IsIn(['active', 'delete'])
  status: string;
}
