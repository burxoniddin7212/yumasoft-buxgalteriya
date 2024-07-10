import { IsIn, IsNumberString, IsString } from 'class-validator';

export class GetBySectionNumberIncomeQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsString()
  section_number: string;

  @IsString()
  @IsIn(['all', 'cash', 'usd', 'plastik'])
  money_filter: string;
}
