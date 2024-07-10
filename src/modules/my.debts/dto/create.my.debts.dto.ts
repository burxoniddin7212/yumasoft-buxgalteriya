import { IsIn, IsNumberString, IsString, Matches } from 'class-validator';

export class CreateMyDebtDto {
  @IsString()
  text: string;

  @IsNumberString()
  @Matches(/^[0-9]+$/)
  debt_amount: string;

  @IsString()
  @IsIn(['cash', 'usd'], {
    message: 'debt_type should be either "cash" or "usd"',
  })
  debt_type: string;
}
