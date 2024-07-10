import { Response } from 'express';
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';

@Catch(UnprocessableEntityException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.getResponse().message,
    });
  }
}
