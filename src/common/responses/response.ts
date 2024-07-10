export const response = <T>(
  statusCode: number,
  message: string,
  data: null | undefined | T,
) => {
  return {
    statusCode: statusCode,
    message: message,
    data: data,
  };
};
