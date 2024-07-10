import { RolesNames } from 'src/config';
import { PrepaymentService } from './prepayment.service';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import {
  CreatePrepaymentDto,
  UpdatePrepaymentDto,
  GetPrepaymentMonthDto,
  GetAllPrepaymentQueryhDto,
} from './dto';
import {
  Put,
  Req,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

@Controller('prepayment')
@UseGuards(MyJwtGuard, RoleGuard)
export class PrepaymentController {
  constructor(private readonly service: PrepaymentService) {}

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() query: GetAllPrepaymentQueryhDto) {
    return await this.service.getAll(query);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('user_token')
  @HttpCode(HttpStatus.OK)
  async getByToken(@Req() req) {
    return await this.service.getByToken(req?.user?.user_id);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('user_id')
  @HttpCode(HttpStatus.OK)
  async getByUserId(@Query() query: GetPrepaymentMonthDto) {
    return await this.service.getByUserId(query);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreatePrepaymentDto) {
    return await this.service.create(body);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdatePrepaymentDto) {
    return await this.service.update(body);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
