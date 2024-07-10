import * as moment from 'moment';
import { Incomes } from 'src/entities';
import { uzbTimeZone } from 'src/config';
import { statistics } from './types/interfases';
import { Between, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  response,
  responseWidthPagination,
  incomesColculateStatistics,
  responseWidthPaginationForIncomesStatistics,
} from 'src/common';
import {
  CreateIncomeDto,
  UpdateIncomeDto,
  GetIncomeQueryDto,
  GetSomeDayMonthIncomeDto,
  GetByClientIdIncomeQueryDto,
  GetBySectionNumberIncomeQueryDto,
} from './dto';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Incomes)
    private readonly incomeEntity: Repository<Incomes>,
  ) {}

  async getAll(query: GetIncomeQueryDto) {
    const { page, limit, status, money_filter } = query;

    const skip: number = (+page - 1) * +limit;

    let incomes: [Incomes[], number];

    if (money_filter == 'all') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { status },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'cash') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { status, cash: Not('0') },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'usd') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { status, usd: Not('0') },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'plastik') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { status, plastik: Not('0') },
        skip,
        take: +limit,
      });
    }

    return responseWidthPagination<Incomes[]>(
      200,
      'ok',
      incomes[1],
      incomes[0],
    );
  }

  async getById(id: string) {
    const incomes: Incomes = await this.incomeEntity.findOne({
      where: { income_id: +id },
    });

    if (!incomes) throw new NotFoundException('not found');

    return response<Incomes>(200, 'ok', incomes);
  }

  async getByClientId(query: GetByClientIdIncomeQueryDto) {
    const { page, limit, client_id, money_filter } = query;

    const skip: number = (+page - 1) * +limit;

    let incomes: [Incomes[], number];

    if (money_filter == 'all') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { client_id: client_id, status: 'active' },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'cash') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { client_id: client_id, cash: Not('0'), status: 'active' },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'usd') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { client_id: client_id, usd: Not('0'), status: 'active' },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'plastik') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { client_id: client_id, plastik: Not('0'), status: 'active' },
        skip,
        take: +limit,
      });
    }

    return responseWidthPagination<Incomes[]>(
      200,
      'ok',
      incomes[1],
      incomes[0],
    );
  }

  async getBySectionNumber(query: GetBySectionNumberIncomeQueryDto) {
    const { page, limit, section_number, money_filter } = query;

    const skip: number = (+page - 1) * +limit;

    let incomes: [Incomes[], number];

    if (money_filter == 'all') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { section_number, status: 'active' },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'cash') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { section_number, cash: Not('0'), status: 'active' },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'usd') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { section_number, usd: Not('0'), status: 'active' },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'plastik') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { section_number, plastik: Not('0'), status: 'active' },
        skip,
        take: +limit,
      });
    }

    const statistics: statistics = await incomesColculateStatistics(incomes);

    return responseWidthPaginationForIncomesStatistics<Incomes[]>(200, 'ok', {
      count: incomes[1],
      statistics: statistics,
      data: incomes[0],
    });
  }

  async getSomeDayMonth(query: GetSomeDayMonthIncomeDto) {
    const { page, limit, year, month, day, money_filter } = query;

    const skip: number = (+page - 1) * +limit;

    let startOfTheDay: Date;
    let endOfTheDay: Date;

    if (+day > 0) {
      startOfTheDay = moment({
        year: +year,
        month: +month - 1,
        day: +day,
      })
        .tz(uzbTimeZone)
        .startOf('day')
        .toDate();

      endOfTheDay = moment({ year: +year, month: +month - 1, day: +day })
        .tz(uzbTimeZone)
        .endOf('day')
        .toDate();
    }

    if (day == '0') {
      startOfTheDay = moment({ year: +year, month: +month - 1 })
        .tz(uzbTimeZone)
        .startOf('month')
        .toDate();

      endOfTheDay = moment({ year: +year, month: +month - 1 })
        .tz(uzbTimeZone)
        .endOf('month')
        .toDate();
    }

    let incomes: [Incomes[], number];

    if (money_filter == 'all') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'ASC' },
        where: {
          status: 'active',
          created_at: Between(startOfTheDay, endOfTheDay),
        },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'cash') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'ASC' },
        where: {
          status: 'active',
          cash: Not('0'),
          created_at: Between(startOfTheDay, endOfTheDay),
        },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'usd') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'ASC' },
        where: {
          status: 'active',
          usd: Not('0'),
          created_at: Between(startOfTheDay, endOfTheDay),
        },
        skip,
        take: +limit,
      });
    }

    if (money_filter == 'plastik') {
      incomes = await this.incomeEntity.findAndCount({
        order: { created_at: 'ASC' },
        where: {
          status: 'active',
          plastik: Not('0'),
          created_at: Between(startOfTheDay, endOfTheDay),
        },
        skip,
        take: +limit,
      });
    }

    const statistics: statistics = await incomesColculateStatistics(incomes);

    return responseWidthPaginationForIncomesStatistics<Incomes[]>(200, 'ok', {
      count: incomes[1],
      statistics: statistics,
      data: incomes[0],
    });
  }

  async create(body: CreateIncomeDto) {
    let income: Incomes = this.incomeEntity.create(body);
    income = await this.incomeEntity.save(income);

    return response<Incomes>(201, 'was created', income);
  }

  async update(body: UpdateIncomeDto) {
    let obj = { ...body };

    delete obj.income_id;

    const income = await this.incomeEntity.update(
      { income_id: body.income_id },
      obj,
    );

    return response(200, 'updated', income);
  }

  async delete(id: string) {
    const income = await this.incomeEntity.update(
      { income_id: +id },
      { status: 'delete' },
    );

    return response(200, 'deleted', income);
  }
}
