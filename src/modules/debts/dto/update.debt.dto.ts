import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class UpdateDebtDto {
  @IsNumber()
  debt_id: number;

  @IsString()
  text: string;

  @IsNumberString()
  debt_amount: string;
}
