import { IsNumberString } from 'class-validator';

export class GetBySubCategorytDocumentsQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsNumberString()
  id: string;
}
