import { IsIn, IsNumberString, IsString } from 'class-validator';

export class CreateDebtDto {
  @IsString()
  text: string;

  @IsNumberString()
  debt_amount: string;

  @IsString()
  @IsIn(['cash', 'usd'], {
    message: 'debt_type should be either "cash" or "usd"',
  })
  debt_type: string;
}
