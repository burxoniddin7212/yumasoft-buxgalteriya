import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, jwtSecretKey } from './common';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: jwtSecretKey }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'yumasoft_buxgalteriya',
      username: 'burxoniddin',
      host: 'localhost',
      password: '7212',
      port: 5432,
      entities: [__dirname + '/entities/*.entity.{ts,js}'],
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    JwtStrategy,
  ],
})
export class AppCommonModule {}
