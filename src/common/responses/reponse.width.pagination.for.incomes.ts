import { statistics } from '../../modules/incomes/types/interfases';

export const responseWidthPaginationForIncomesStatistics = <T>(
  statusCode: number,
  message: string,
  data: {
    count: number;
    statistics: statistics;
    data: undefined | null | T;
  },
) => {
  return {
    statusCode: statusCode,
    message: message,
    data: data,
  };
};
