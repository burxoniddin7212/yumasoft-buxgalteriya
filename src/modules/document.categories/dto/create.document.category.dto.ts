import { Length, IsString } from 'class-validator';

export class CreateDocumentCategoryDto {
  @IsString()
  @Length(3, 30)
  name: string;
}
