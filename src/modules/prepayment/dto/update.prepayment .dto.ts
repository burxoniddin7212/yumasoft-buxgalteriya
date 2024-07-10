import { IsIn, IsNumber, IsString } from 'class-validator';

export class UpdatePrepaymentDto {
  @IsNumber()
  prepayment_id: number;

  @IsNumber()
  prepayment_amount: number;

  @IsString()
  text: string;
}
