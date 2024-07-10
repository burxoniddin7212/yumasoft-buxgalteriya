import { IsNumberString, IsString, IsIn } from 'class-validator';

export class GetThisDayQueryExpensesDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: number;

  @IsString()
  @IsIn(['all', 'cash', 'usd', 'plastik'])
  money_filter: string;
}
