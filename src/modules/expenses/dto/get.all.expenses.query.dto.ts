import { IsNumberString, IsString, IsIn } from 'class-validator';

export class GetAllQueryExpensesDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: number;

  @IsString()
  status: string;

  @IsString()
  @IsIn(['all', 'cash', 'usd', 'plastik'])
  money_filter: string;
}
