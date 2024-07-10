import { IsIn, IsNumberString, IsString } from 'class-validator';

export class GetAllPrepaymentQueryhDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsString()
  @IsIn(['active', 'delete'])
  status: string;
}
