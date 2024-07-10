import { RolesNames } from 'src/config';
import { UsersService } from './users.service';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import { UpdatePasswordDto, UpdateUsersDto } from './dto';
import {
  Put,
  Get,
  Body,
  Param,
  Query,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';

@Controller('users')
@UseGuards(MyJwtGuard, RoleGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('status') status: string = 'active') {
    return await this.usersService.getAll(status);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.usersService.getById(id);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() body: UpdateUsersDto) {
    return await this.usersService.update(id, body);
  }

  @Roles(RolesNames.superAdmin)
  @Put('update_password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(@Body() body: UpdatePasswordDto) {
    return await this.usersService.updatePassword(body);
  }

  @Roles(RolesNames.superAdmin)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }

  @Roles(RolesNames.superAdmin)
  @Put('is_active/:id')
  @HttpCode(HttpStatus.OK)
  async isActive(@Param('id') id: string) {
    return await this.usersService.isActive(id);
  }
}
