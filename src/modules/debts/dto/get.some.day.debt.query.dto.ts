import { IsNumberString } from 'class-validator';

export class GetSomeDayDebtQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;

  @IsNumberString()
  day: string;
}
