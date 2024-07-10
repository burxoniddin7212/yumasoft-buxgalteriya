import { Users } from 'src/entities';
import { RolesNames } from 'src/config';
import { AuthService } from './auth.service';
import { CreateUsersDto, LoginDto } from './dto/index';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import {
  response,
  responseForAuth,
  responseWidthToken,
} from 'src/common/responses';
import {
  Get,
  Req,
  Res,
  Body,
  Post,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServise: AuthService) {}

  @Roles(RolesNames.superAdmin)
  @UseGuards(MyJwtGuard, RoleGuard)
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUsers(@Res() res, @Body() body: CreateUsersDto) {
    const user = await this.authServise.registerUsers(body);

    return responseForAuth<Users>(res, 201, 'created', user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res() res, @Body() body: LoginDto) {
    const user = await this.authServise.login(body);

    return responseWidthToken<Users>(res, 200, 'ok', user.user, user.token);
  }

  @Roles(RolesNames.superAdmin, RolesNames.admin, RolesNames.user)
  @UseGuards(MyJwtGuard, RoleGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getByToken(@Req() req) {
    let data = req.user;

    delete data?.iat;
    delete data?.exp;

    return response<Users>(200, 'ok', data);
  }
}
