export const responseWidthPaginationForPrepay = <T>(
  statusCode: number,
  message: string,
  data: {
    count: number;
    statistics: { cash: number; usd: number; plastic: number };
    prepayments: undefined | null | T;
  },
) => {
  return {
    statusCode: statusCode,
    message: message,
    data: data,
  };
};
