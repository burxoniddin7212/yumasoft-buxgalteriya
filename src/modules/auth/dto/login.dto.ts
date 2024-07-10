import { IsString, Length, IsNumberString, Matches } from 'class-validator';

export class LoginDto {
  @IsNumberString()
  @Length(12)
  @Matches(/^[0-9]+$/, { message: 'phone_num must have 12 digits' })
  number: string;

  @IsString()
  password: string;
}
