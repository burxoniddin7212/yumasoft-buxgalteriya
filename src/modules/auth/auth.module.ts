import { Users } from 'src/entities';
import { Module } from '@nestjs/common';
import { MyJwtGuard } from 'src/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService, MyJwtGuard],
})
export class AuthModule {}
