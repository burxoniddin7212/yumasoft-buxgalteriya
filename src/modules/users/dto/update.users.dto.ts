import { IsString, Length, IsNumberString, Matches } from 'class-validator';

export class UpdateUsersDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsNumberString()
  @Length(12)
  @Matches(/^[0-9]+$/, { message: 'phone_num must have 12 digits' })
  number: string;
}
