import * as moment from 'moment';
import { uzbTimeZone } from 'src/config';
import { Common, Expenses } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Between, Repository, MoreThanOrEqual, Not, IsNull } from 'typeorm';
import {
  response,
  resExpenStatistics,
  expensesMoneyFilter,
  responseWidthPagination,
  calculateExpensesStatistics,
} from 'src/common';
import {
  CreateExpensesDto,
  UpdateExpensesDto,
  GetAllQueryExpensesDto,
  GetSomeDayQueryExpensesDto,
  GetThisDayQueryExpensesDto,
  GetSomeMonthQueryExpensesDto,
} from './dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expenses)
    private readonly expensesEntity: Repository<Expenses>,
    private readonly commonService: CommonService, // // @InjectRepository(Common) private readonly commonEntity: Repository<Common>,
  ) {}

  // async getAll(query: GetAllQueryExpensesDto) {
  //   const { page, limit, status, money_filter } = query;

  //   const skip: number = (+page - 1) * +limit;

  //   let expenses: [Expenses[], number];

  //   if (money_filter == 'all') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'DESC' },
  //       where: { status },
  //       relations: ['category_id', 'sub_category_id'],
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   if (money_filter == 'cash') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'DESC' },
  //       where: { status, cash: Not(IsNull()) },
  //       relations: ['category_id', 'sub_category_id'],
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   if (money_filter == 'usd') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'DESC' },
  //       where: { status, usd: Not(IsNull()) },
  //       relations: ['category_id', 'sub_category_id'],
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   if (money_filter == 'plastik') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'DESC' },
  //       where: { status, plastik: Not(IsNull()) },
  //       relations: ['category_id', 'sub_category_id'],
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   return responseWidthPagination<Expenses[]>(
  //     200,
  //     'ok',
  //     expenses[1],
  //     expenses[0],
  //   );
  // }

  // async getById(id: string) {
  //   const expenses: Expenses = await this.expensesEntity.findOne({
  //     where: { expense_id: +id },
  //     relations: ['category_id', 'sub_category_id'],
  //   });

  //   if (!expenses) throw new NotFoundException('not found');

  //   return response<Expenses>(200, 'ok', expenses);
  // }

  // async getThisDay(query: GetThisDayQueryExpensesDto) {
  //   const { page, limit, money_filter } = query;

  //   const skip: number = (+page - 1) * +limit;

  //   const currentDate: moment.Moment = moment().tz(uzbTimeZone);

  //   const startOfSecond: Date = currentDate
  //     .startOf('day')
  //     .startOf('second')
  //     .toDate();

  //   let expenses: [Expenses[], number];

  //   if (money_filter == 'all') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'DESC' },
  //       where: {
  //         status: 'active',
  //         created_at: MoreThanOrEqual(startOfSecond),
  //       },
  //       relations: ['category_id', 'sub_category_id'],
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   if (money_filter == 'cash') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'DESC' },
  //       where: {
  //         status: 'active',
  //         cash: Not(IsNull()),
  //         created_at: MoreThanOrEqual(startOfSecond),
  //       },
  //       relations: ['category_id', 'sub_category_id'],
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   if (money_filter == 'usd') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'DESC' },
  //       where: {
  //         status: 'active',
  //         usd: Not(IsNull()),
  //         created_at: MoreThanOrEqual(startOfSecond),
  //       },
  //       relations: ['category_id', 'sub_category_id'],
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   if (money_filter == 'plastik') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'DESC' },
  //       where: {
  //         status: 'active',
  //         plastik: Not(IsNull()),
  //         created_at: MoreThanOrEqual(startOfSecond),
  //       },
  //       relations: ['category_id', 'sub_category_id'],
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   const usd_kurs: Common = await this.commonEntity.findOne({
  //     where: { name: 'usd_kurs' },
  //   });

  //   const obj = await calculateExpensesStatistics(expenses[0], +usd_kurs.text);

  //   return resExpenStatistics<Expenses[]>(
  //     200,
  //     'ok',
  //     expenses[1],
  //     obj,
  //     expenses[0],
  //   );
  // }

  // async getSomeDay(query: GetSomeDayQueryExpensesDto) {
  //   const {
  //     page = '1',
  //     limit = '20',
  //     year,
  //     month,
  //     day,
  //     category,
  //     sub_category,
  //     money_filter,
  //   } = query;

  //   const skip: number = (+page - 1) * +limit;

  //   const startOfTheDay: Date = moment({
  //     year: +year,
  //     month: +month - 1,
  //     day: +day,
  //   })
  //     .tz(uzbTimeZone)
  //     .startOf('day')
  //     .toDate();

  //   const endOfTheDay: Date = moment({
  //     year: +year,
  //     month: +month - 1,
  //     day: +day,
  //   })
  //     .tz(uzbTimeZone)
  //     .endOf('day')
  //     .toDate();

  //   let expenses: [Expenses[], number];

  //   if (sub_category != '0') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'ASC' },
  //       where: {
  //         sub_category_id: +sub_category,
  //         status: 'active',
  //         created_at: Between(startOfTheDay, endOfTheDay),
  //       },
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   if (sub_category == '0' && category != '0') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'ASC' },
  //       where: {
  //         category_id: +category,
  //         status: 'active',
  //         created_at: Between(startOfTheDay, endOfTheDay),
  //       },
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   if (sub_category == '0' && category == '0') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'ASC' },
  //       where: {
  //         status: 'active',
  //         created_at: Between(startOfTheDay, endOfTheDay),
  //       },
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   const usd_kurs: Common = await this.commonEntity.findOne({
  //     where: { name: 'usd_kurs' },
  //   });

  //   const moneyFilter: Expenses[] = await expensesMoneyFilter(
  //     expenses[0],
  //     money_filter,
  //   );

  //   const obj = await calculateExpensesStatistics(moneyFilter, +usd_kurs.text);

  //   return resExpenStatistics<Expenses[]>(
  //     200,
  //     'ok',
  //     moneyFilter.length,
  //     obj,
  //     moneyFilter,
  //   );
  // }

  // async getSomeMonth(query: GetSomeMonthQueryExpensesDto) {
  //   const { page, limit, year, month, category, sub_category, money_filter } =
  //     query;

  //   const skip: number = (+page - 1) * +limit;

  //   const startOfTheDay: Date = moment({ year: +year, month: +month - 1 })
  //     .tz(uzbTimeZone)
  //     .startOf('month')
  //     .toDate();

  //   const endOfTheDay: Date = moment({ year: +year, month: +month - 1 })
  //     .tz(uzbTimeZone)
  //     .endOf('month')
  //     .toDate();

  //   let expenses: [Expenses[], number];

  //   if (sub_category != '0') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'ASC' },
  //       where: {
  //         sub_category_id: +sub_category,
  //         status: 'active',
  //         created_at: Between(startOfTheDay, endOfTheDay),
  //       },
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   if (sub_category == '0' && category != '0') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'ASC' },
  //       where: {
  //         category_id: +category,
  //         status: 'active',
  //         created_at: Between(startOfTheDay, endOfTheDay),
  //       },
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   if (sub_category == '0' && category == '0') {
  //     expenses = await this.expensesEntity.findAndCount({
  //       order: { created_at: 'ASC' },
  //       where: {
  //         status: 'active',
  //         created_at: Between(startOfTheDay, endOfTheDay),
  //       },
  //       skip,
  //       take: +limit,
  //     });
  //   }

  //   const usd_kurs: Common = await this.commonEntity.findOne({
  //     where: { name: 'usd_kurs' },
  //   });

  //   const moneyFilter: Expenses[] = await expensesMoneyFilter(
  //     expenses[0],
  //     money_filter,
  //   );

  //   const obj = await calculateExpensesStatistics(moneyFilter, +usd_kurs.text);

  //   return resExpenStatistics<Expenses[]>(
  //     200,
  //     'ok',
  //     moneyFilter.length,
  //     obj,
  //     moneyFilter,
  //   );
  // }

  // async create(body: CreateExpensesDto, user_id: number) {
  //   const usd_kurs: Common = await this.commonEntity.findOne({
  //     where: { name: 'usd_kurs' },
  //   });

  //   const data = { ...body, user_id, usd_kurs: usd_kurs.text };

  //   let expenses: Expenses = this.expensesEntity.create(data);
  //   expenses = await this.expensesEntity.save(expenses);

  //   return response<Expenses>(201, 'created', expenses);
  // }

  // async update(body: UpdateExpensesDto) {
  //   const cheek: Expenses = await this.expensesEntity.findOne({
  //     where: { expense_id: body.expense_id },
  //   });

  //   if (!cheek) throw new NotFoundException('not found');

  //   const expenses = await this.expensesEntity.update(
  //     { expense_id: body.expense_id },
  //     {
  //       usd: body.usd,
  //       cash: body.cash,
  //       plastik: body.plastik,
  //       text: body.text,
  //     },
  //   );

  //   return response(200, 'updated', expenses);
  // }

  // async delete(id: string) {
  //   const cheek: Expenses = await this.expensesEntity.findOne({
  //     where: { expense_id: +id },
  //   });

  //   if (!cheek) throw new NotFoundException('not found');

  //   const expenses = await this.expensesEntity.update(
  //     { expense_id: +id },
  //     { status: 'delete' },
  //   );

  //   return response(200, 'deleted', expenses);
  // }

  // async isActive(id: string) {
  //   const cheek: Expenses = await this.expensesEntity.findOne({
  //     where: { expense_id: +id },
  //   });

  //   if (!cheek) throw new NotFoundException('not found');

  //   const expenses = await this.expensesEntity.update(
  //     { expense_id: +id },
  //     { status: 'active' },
  //   );

  //   return response(200, 'activated', expenses);
  // }
}
