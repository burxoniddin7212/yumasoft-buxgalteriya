import { RolesNames } from 'src/config';
import { UpdateUsdKursDto } from './dto';
import { CommonService } from './common.service';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import {
  Get,
  Put,
  Body,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

@Controller('common')
@UseGuards(MyJwtGuard, RoleGuard)
export class CommonController {
  constructor(private readonly service: CommonService) {}

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('usd_kurs')
  @HttpCode(HttpStatus.OK)
  async getUsdKurs() {
    return await this.service.getUsdKurs();
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Put('usd_kurs')
  @HttpCode(HttpStatus.OK)
  async updateUsdKurs(@Body() body: UpdateUsdKursDto) {
    return await this.service.updateUsdKurs(body);
  }
}
