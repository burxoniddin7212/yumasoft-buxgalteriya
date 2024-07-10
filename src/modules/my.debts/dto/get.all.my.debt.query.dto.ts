import { IsString, IsIn, IsNumberString } from 'class-validator';

export class GetAllMyDebtQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsString()
  @IsIn(['active', 'delete'])
  status: string;
}
