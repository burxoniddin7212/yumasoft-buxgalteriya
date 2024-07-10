import { IsNumberString } from 'class-validator';

export class GetPrepaymentMonthDto {
  @IsNumberString()
  user_id: string;

  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;
}
