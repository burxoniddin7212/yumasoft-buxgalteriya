import { IsNumberString, IsString, IsIn } from 'class-validator';

export class GetSomeMonthQueryExpensesDto {
  @IsNumberString()
  page: string | undefined;

  @IsNumberString()
  limit: number | undefined;

  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;

  @IsNumberString()
  category: string;

  @IsNumberString()
  sub_category: string;

  @IsString()
  @IsIn(['all', 'cash', 'usd', 'plastik'])
  money_filter: string;
}
