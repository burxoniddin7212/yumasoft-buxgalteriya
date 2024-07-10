import { join } from 'path';
import { PORT } from './config';
import * as express from 'express';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.use('/uploades', express.static(join(process.cwd(), 'uploades')));

  await app.listen(PORT, () => console.log('Server ready ', PORT));
}
bootstrap();
