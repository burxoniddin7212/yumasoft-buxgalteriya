import { IsIn, IsNumberString, IsString } from 'class-validator';

export class GetByClientIdIncomeQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsNumberString()
  client_id: string;

  @IsString()
  @IsIn(['all', 'cash', 'usd', 'plastik'])
  money_filter: string;
}
