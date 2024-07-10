import { IsString, IsNumber, MinLength, MaxLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNumber()
  user_id: number;

  @IsString()
  @MinLength(4)
  @MaxLength(15)
  password: string;
}
