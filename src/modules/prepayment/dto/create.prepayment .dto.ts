import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreatePrepaymentDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  prepayment_amount: number;

  @IsString()
  @IsIn(['cash', 'usd', 'plastic'], {
    message: 'prepayment_type should be either "cash" or "usd" or "plastic"',
  })
  prepayment_type: string;

  @IsString()
  text: string;
}
