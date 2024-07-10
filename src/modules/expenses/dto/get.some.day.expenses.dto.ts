import { IsNumberString, IsString, IsIn } from 'class-validator';

export class GetSomeDayQueryExpensesDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: number;

  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;

  @IsNumberString()
  day: string;

  @IsNumberString()
  category: string;

  @IsNumberString()
  sub_category: string;

  @IsString()
  @IsIn(['all', 'cash', 'usd', 'plastik'])
  money_filter: string;
}
