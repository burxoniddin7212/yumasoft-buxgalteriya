import { IsNumberString, IsNumber } from 'class-validator';

export class GetBySubCategoryNotesDto {
  @IsNumberString()
  sub_category_id: string;

  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;
}
