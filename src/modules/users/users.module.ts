import { Users } from 'src/entities';
import { Module } from '@nestjs/common';
import { MyJwtGuard } from 'src/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, MyJwtGuard],
})
export class UsersModule {}
