import { RolesNames } from 'src/config';
import { IncomesService } from './incomes.service';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import {
  CreateIncomeDto,
  UpdateIncomeDto,
  GetIncomeQueryDto,
  GetSomeDayMonthIncomeDto,
  GetByClientIdIncomeQueryDto,
  GetBySectionNumberIncomeQueryDto,
} from './dto';
import {
  Put,
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

@Controller('incomes')
@UseGuards(MyJwtGuard, RoleGuard)
export class IncomesController {
  constructor(private readonly service: IncomesService) {}

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() query: GetIncomeQueryDto) {
    return await this.service.getAll(query);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('client_id')
  @HttpCode(HttpStatus.OK)
  async getByClientId(@Query() query: GetByClientIdIncomeQueryDto) {
    return await this.service.getByClientId(query);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('section_number')
  @HttpCode(HttpStatus.OK)
  async getBySectionNumber(@Query() query: GetBySectionNumberIncomeQueryDto) {
    return await this.service.getBySectionNumber(query);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('get_some_day_month')
  @HttpCode(HttpStatus.OK)
  async getSomeDayMonth(@Query() query: GetSomeDayMonthIncomeDto) {
    return await this.service.getSomeDayMonth(query);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateIncomeDto) {
    return await this.service.create(body);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateIncomeDto) {
    return await this.service.update(body);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
