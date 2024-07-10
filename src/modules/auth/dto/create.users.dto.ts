import {
  IsIn,
  Length,
  Matches,
  IsString,
  MinLength,
  MaxLength,
  IsNumberString,
} from 'class-validator';

export class CreateUsersDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsNumberString()
  @Length(12)
  @Matches(/^[0-9]+$/, { message: 'phone_num must have 12 digits' })
  number: string;

  @IsString()
  @MinLength(4)
  @MaxLength(15)
  password: string;

  @IsString()
  @IsIn(['user', 'admin', 'superAdmin'])
  role: string;
}
