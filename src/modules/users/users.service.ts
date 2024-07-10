import * as sha256 from 'sha256';
import { Repository } from 'typeorm';
import { response } from 'src/common';
import { Users } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDto, UpdateUsersDto } from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly UsersEntity: Repository<Users>,
  ) {}

  async getAll(status: string) {
    const users: Users[] = await this.UsersEntity.find({
      where: { status },
      select: [
        'user_id',
        'first_name',
        'last_name',
        'number',
        'role',
        'status',
        'created_at',
      ],
    });

    return response<Users[]>(200, 'ok', users);
  }

  async getById(id: string) {
    const users: Users = await this.UsersEntity.findOne({
      where: { user_id: +id, status: 'active' },
      select: [
        'user_id',
        'first_name',
        'last_name',
        'number',
        'role',
        'status',
        'created_at',
      ],
    });

    if (!users) throw new NotFoundException('not found');

    return response<Users>(200, 'ok', users);
  }

  async update(user_id: string, body: UpdateUsersDto) {
    const cheek: Users = await this.UsersEntity.findOne({
      where: { user_id: +user_id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const users = await this.UsersEntity.update(+user_id, body);

    return response(200, 'updated', users);
  }

  async updatePassword(body: UpdatePasswordDto) {
    const cheek: Users = await this.UsersEntity.findOne({
      where: { user_id: body.user_id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const password: string = sha256(body.password);

    const users = await this.UsersEntity.update(
      { user_id: body.user_id },
      { password },
    );

    return response(200, 'password updated', users);
  }

  async delete(user_id: string) {
    const cheek: Users = await this.UsersEntity.findOne({
      where: { user_id: +user_id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const users = await this.UsersEntity.update(+user_id, { status: 'delete' });

    return response(200, 'deleted', users);
  }

  async isActive(user_id: string) {
    const cheek: Users = await this.UsersEntity.findOne({
      where: { user_id: +user_id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const users = await this.UsersEntity.update(+user_id, { status: 'active' });

    return response(200, 'activated', users);
  }
}
