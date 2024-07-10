import { Length, IsString, IsNumber } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsNumber()
  sub_category_id: number;

  @IsString()
  @Length(3, 30)
  name: string;
}
