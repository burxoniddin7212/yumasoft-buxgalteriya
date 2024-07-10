import { IsString, IsNumber, IsIn, IsNumberString } from 'class-validator';

export class RepaymentDebtDto {
  @IsNumber()
  debt_id: number;

  @IsNumberString()
  debt_amount: string;

  @IsString()
  @IsIn(['cash', 'usd'], {
    message: 'debt_type should be either "cash" or "usd"',
  })
  debt_type: string;
}
