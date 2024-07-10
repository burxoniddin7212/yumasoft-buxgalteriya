import { IsString } from 'class-validator';

export class UpdateUsdKursDto {
  @IsString()
  text: string;
}
