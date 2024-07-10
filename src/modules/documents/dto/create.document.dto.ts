import { IsString, IsNumberString } from 'class-validator';

export class CreateDocumentsDto {
  @IsNumberString()
  category_id: string;

  @IsNumberString()
  sub_category_id: string;

  @IsString()
  text: string;
}
