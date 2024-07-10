import { RolesNames } from 'src/config';
import { ExpensesService } from './expenses.service';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import {
  CreateExpensesDto,
  UpdateExpensesDto,
  GetAllQueryExpensesDto,
  GetSomeDayQueryExpensesDto,
  GetThisDayQueryExpensesDto,
  GetSomeMonthQueryExpensesDto,
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

@Controller('expenses')
@UseGuards(MyJwtGuard, RoleGuard)
export class ExpensesController {
  constructor(private readonly service: ExpensesService) {}

  // @Roles(RolesNames.admin, RolesNames.superAdmin)
  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async getAll(@Query() query: GetAllQueryExpensesDto) {
  //   return await this.service.getAll(query);
  // }

  // @Roles(RolesNames.admin, RolesNames.superAdmin)
  // @Get('id/:id')
  // @HttpCode(HttpStatus.OK)
  // async getById(@Param('id') id: string) {
  //   return await this.service.getById(id);
  // }

  // @Roles(RolesNames.admin, RolesNames.superAdmin)
  // @Get('this_day')
  // @HttpCode(HttpStatus.OK)
  // async getThisDay(@Query() query: GetThisDayQueryExpensesDto) {
  //   return await this.service.getThisDay(query);
  // }

  // @Roles(RolesNames.admin, RolesNames.superAdmin)
  // @Get('some_day')
  // @HttpCode(HttpStatus.OK)
  // async getSomeDay(@Query() query: GetSomeDayQueryExpensesDto) {
  //   return await this.service.getSomeDay(query);
  // }

  // @Roles(RolesNames.admin, RolesNames.superAdmin)
  // @Get('some_month')
  // @HttpCode(HttpStatus.OK)
  // async getSomeMonth(@Query() query: GetSomeMonthQueryExpensesDto) {
  //   return await this.service.getSomeMonth(query);
  // }

  // @Roles(RolesNames.admin, RolesNames.superAdmin)
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async create(@Req() req, @Body() body: CreateExpensesDto) {
  //   return await this.service.create(body, req.user.user_id);
  // }

  // @Roles(RolesNames.admin, RolesNames.superAdmin)
  // @Put()
  // @HttpCode(HttpStatus.OK)
  // async update(@Body() body: UpdateExpensesDto) {
  //   return await this.service.update(body);
  // }

  // @Roles(RolesNames.admin, RolesNames.superAdmin)
  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // async delete(@Param('id') id: string) {
  //   return await this.service.delete(id);
  // }

  // @Roles(RolesNames.admin, RolesNames.superAdmin)
  // @Put('is_active/:id')
  // @HttpCode(HttpStatus.OK)
  // async isActive(@Param('id') id: string) {
  //   return await this.service.isActive(id);
  // }
}
