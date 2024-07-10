export const responseWidthPagination = <T>(
  statusCode: number,
  message: string,
  count: number,
  data: undefined | null | T,
) => {
  return {
    statusCode: statusCode,
    message: message,
    count: count,
    data: data,
  };
};
