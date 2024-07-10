import * as sha256 from 'sha256';
import { sign } from 'jsonwebtoken';
import { Users } from 'src/entities';
import { Repository } from 'typeorm';
import { jwtSecretKey } from 'src/common';
import { CreateUsersDto, LoginDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly UsersEntity: Repository<Users>,
  ) {}

  async registerUsers(body: CreateUsersDto) {
    const cheekUnique: Users = await this.UsersEntity.findOne({
      where: { number: body.number },
    });

    if (cheekUnique) throw new BadRequestException('number is unique');

    body.password = sha256(body.password);

    let user: Users = this.UsersEntity.create(body);
    user = await this.UsersEntity.save(user);

    delete user?.password;

    return user;
  }

  async login(body: LoginDto) {
    body.password = sha256(body.password);

    let user: Users = await this.UsersEntity.findOne({ where: body });

    if (!user) throw new NotFoundException('not found');

    delete user?.password;

    const payload = { ...user };

    const token: any = sign(payload, jwtSecretKey, {
      expiresIn: 180 * 24 * 60 * 60,
    });

    return { user, token };
  }
}
