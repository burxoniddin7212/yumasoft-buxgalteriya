import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class UpdateMyDebtDto {
  @IsNumber()
  my_debt_id: number;

  @IsString()
  text: string;

  @IsNumberString()
  debt_amount: string;
}
