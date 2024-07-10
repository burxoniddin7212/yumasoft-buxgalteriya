import {
  IsString,
  IsNumber,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class UpdateExpensesDto {
  @IsNumber()
  expense_id: number;

  @IsOptional()
  @IsNumberString()
  cash: string | null;

  @IsOptional()
  @IsNumberString()
  usd: string | null;

  @IsOptional()
  @IsNumberString()
  plastik: string | null;

  @IsString()
  text: string;
}
