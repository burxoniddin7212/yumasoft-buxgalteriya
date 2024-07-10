import { RolesNames } from 'src/config';
import { DebtsService } from './debts.service';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import {
  CreateDebtDto,
  UpdateDebtDto,
  RepaymentDebtDto,
  CreateDebtQueryDto,
  GetSomeDayDebtQueryDto,
  GetSomeMonthDebtQueryDto,
} from './dto';
import {
  Put,
  Req,
  Get,
  Body,
  Post,
  Param,
  Query,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

@Controller('debts')
@UseGuards(MyJwtGuard, RoleGuard)
export class DebtsController {
  constructor(private readonly service: DebtsService) {}

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() query: CreateDebtQueryDto) {
    return await this.service.getAll(query);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get('some_day')
  @HttpCode(HttpStatus.OK)
  async getSomeDay(@Query() query: GetSomeDayDebtQueryDto) {
    return await this.service.getSomeDay(query);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get('some_month')
  @HttpCode(HttpStatus.OK)
  async getSomeMonth(@Query() query: GetSomeMonthDebtQueryDto) {
    return await this.service.getSomeMonth(query);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req, @Body() body: CreateDebtDto) {
    return await this.service.create(body, req.user.user_id);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateDebtDto) {
    return await this.service.update(body);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Put('repayment')
  @HttpCode(HttpStatus.OK)
  async debtRepayment(@Body() body: RepaymentDebtDto) {
    return await this.service.debtRepayment(body);
  }
}
