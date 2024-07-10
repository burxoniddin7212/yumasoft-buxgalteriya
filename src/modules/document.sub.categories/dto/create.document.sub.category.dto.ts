import { Length, IsString, IsNumber } from 'class-validator';

export class CreateDocumentSubCategoryDto {
  @IsNumber()
  category_id: number;

  @IsString()
  @Length(3, 30)
  name: string;
}
