import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateExpensesDto {
  @IsNumber()
  category_id: number;

  @IsNumber()
  sub_category_id: number;

  @IsOptional()
  @IsString()
  cash: string | null;

  @IsOptional()
  @IsString()
  usd: string | null;

  @IsOptional()
  @IsString()
  plastik: string | null;

  @IsString()
  text: string;
}
