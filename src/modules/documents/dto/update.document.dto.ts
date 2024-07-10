import { IsString, IsNumber } from 'class-validator';

export class UpdateDocumentsDto {
  @IsNumber()
  document_id: number;

  @IsString()
  text: string;
}
