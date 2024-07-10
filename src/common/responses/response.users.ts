import { Response } from 'express';

export const responseWidthToken = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
  access_token: string,
) => {
  return res.status(statusCode).send({
    statusCode: statusCode,
    message: message,
    data: data,
    access_token: access_token,
  });
};
