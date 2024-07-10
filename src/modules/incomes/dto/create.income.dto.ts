import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateIncomeDto {
  @IsNumberString()
  client_id: string;

  @IsString()
  section_number: string;

  @IsNumberString()
  weight: string;

  @IsNumberString()
  cash: string;

  @IsNumberString()
  usd: string;

  @IsNumberString()
  plastik: string;

  @IsString()
  text: string;
}
