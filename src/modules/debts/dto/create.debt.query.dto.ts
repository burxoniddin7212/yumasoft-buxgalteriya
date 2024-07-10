import { IsIn, IsNumberString, IsString } from 'class-validator';

export class CreateDebtQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsString()
  @IsIn(['active', 'delete'])
  status: string;
}
