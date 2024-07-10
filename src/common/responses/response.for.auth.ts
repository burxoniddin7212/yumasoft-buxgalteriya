import { Response } from 'express';

export const responseForAuth = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
) => {
  return res.status(statusCode).send({
    statusCode: statusCode,
    message: message,
    data: data,
  });
};
