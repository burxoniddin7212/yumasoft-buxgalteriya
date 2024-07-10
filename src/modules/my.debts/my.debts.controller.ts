import { RolesNames } from 'src/config';
import { MyDebtsService } from './my.debts.service';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import {
  CreateMyDebtDto,
  UpdateMyDebtDto,
  RepaymentMyDebtDto,
  GetAllMyDebtQueryDto,
  GetSomeMonthMyDebtQueryDto,
} from './dto';
import {
  Req,
  Get,
  Put,
  Body,
  Post,
  Query,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

@Controller('my_debts')
@UseGuards(MyJwtGuard, RoleGuard)
export class MyDebtsController {
  constructor(private readonly service: MyDebtsService) {}

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() query: GetAllMyDebtQueryDto) {
    return await this.service.getAll(query);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get('some_month')
  @HttpCode(HttpStatus.OK)
  async getSomeMonth(@Query() query: GetSomeMonthMyDebtQueryDto) {
    return await this.service.getSomeMonth(query);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req, @Body() body: CreateMyDebtDto) {
    return await this.service.create(body, req.user.user_id);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateMyDebtDto) {
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
  async myDebtRepayment(@Body() body: RepaymentMyDebtDto) {
    return await this.service.myDebtRepayment(body);
  }
}
