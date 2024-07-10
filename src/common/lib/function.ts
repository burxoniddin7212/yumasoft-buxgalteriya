import { Expenses, Incomes, Prepayment } from 'src/entities';
import { statistics } from 'src/modules/incomes/types/interfases';

export const calculateExpensesStatistics = async (
  data: Expenses[] | [],
  usdKurs: number,
) => {
  let usd: number = 0;
  let cash: number = 0;
  let plastik: number = 0;
  let allCash: number = 0;

  if (data.length != 0) {
    for (let i = 0; i < data.length; i++) {
      cash = cash + +data[i].cash;
      usd = +(usd + +data[i].usd).toFixed(3);
      plastik = plastik + +data[i].plastik;
    }

    allCash = usd * usdKurs + cash + plastik;

    return { cash, usd, plastik, allCash, usdKurs };
  }

  return { cash, usd, plastik, allCash, usdKurs };
};

export const expensesMoneyFilter = async (data: Expenses[], filter: string) => {
  let arry: Expenses[];

  if (filter == 'all') return data;
  if (filter == 'cash') arry = data.filter((i) => i.cash != null);
  if (filter == 'usd') arry = data.filter((i) => i.usd != null);
  if (filter == 'plastik') arry = data.filter((i) => i.plastik != null);

  return arry;
};

export const incomesColculateStatistics = async (info: [Incomes[], number]) => {
  const statistics: statistics = {
    allCash: 0,
    allUSD: 0,
    allPlastik: 0,
    allWeight: 0,
  };

  const data: Incomes[] = info[0];

  if (info[1] > 0) {
    for (let i = 0; i < info[1]; i++) {
      statistics.allCash = statistics.allCash + +data[i].cash;
      statistics.allPlastik = statistics.allPlastik + +data[i].plastik;
      statistics.allUSD = +(statistics.allUSD + +data[i].usd).toFixed(3);
      statistics.allWeight = +(statistics.allWeight + +data[i].weight).toFixed(
        3,
      );
    }
  }

  return statistics;
};

export const prepaymentColculateStatistics = async (
  info: [Prepayment[], number],
) => {
  const statistics: { cash: number; usd: number; plastic: number } = {
    cash: 0,
    usd: 0,
    plastic: 0,
  };

  const data: Prepayment[] = info[0];

  if (info[1] > 0) {
    for (let i = 0; i < info[1]; i++) {
      if (data[i].prepayment_type == 'cash')
        statistics.cash = statistics.cash + data[i].prepayment_amount;

      if (data[i].prepayment_type == 'usd')
        statistics.usd = statistics.usd + data[i].prepayment_amount;

      if (data[i].prepayment_type == 'plastic')
        statistics.plastic = statistics.plastic + data[i].prepayment_amount;
    }
  }

  return statistics;
};
