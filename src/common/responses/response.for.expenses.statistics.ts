export const resExpenStatistics = <T>(
  statusCode: number,
  message: string,
  count: number,
  statistics: {
    cash: number;
    usd: number;
    plastik: number;
    allCash: number;
    usdKurs: number;
  },
  data: T,
) => {
  return {
    statusCode: statusCode,
    message: message,
    count: count,
    statistics: statistics,
    data: data,
  };
};
