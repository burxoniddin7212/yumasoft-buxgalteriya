import * as moment from 'moment';
import { Debts } from 'src/entities';
import { uzbTimeZone } from 'src/config';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { response, responseWidthPagination } from 'src/common';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateDebtDto,
  UpdateDebtDto,
  RepaymentDebtDto,
  CreateDebtQueryDto,
  GetSomeDayDebtQueryDto,
  GetSomeMonthDebtQueryDto,
} from './dto';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debts) private readonly debtsEntity: Repository<Debts>,
  ) {}

  async getAll(query: CreateDebtQueryDto) {
    const { page, limit, status } = query;

    const skip: number = (+page - 1) * +limit;

    const debts: [Debts[], number] = await this.debtsEntity.findAndCount({
      order: { created_at: 'DESC' },
      where: { status },
      skip,
      take: +limit,
    });

    return responseWidthPagination<Debts[]>(200, 'ok', debts[1], debts[0]);
  }

  async getSomeDay(query: GetSomeDayDebtQueryDto) {
    const { page, limit, year, month, day } = query;

    const skip: number = (+page - 1) * +limit;

    const startOfTheDay: Date = moment({
      year: +year,
      month: +month - 1,
      day: +day,
    })
      .tz(uzbTimeZone)
      .startOf('day')
      .toDate();

    const endOfTheDay: Date = moment({
      year: +year,
      month: +month - 1,
      day: +day,
    })
      .tz(uzbTimeZone)
      .endOf('day')
      .toDate();

    const debts: [Debts[], number] = await this.debtsEntity.findAndCount({
      order: { created_at: 'ASC' },
      where: {
        status: 'active',
        created_at: Between(startOfTheDay, endOfTheDay),
      },
      skip,
      take: +limit,
    });

    return responseWidthPagination<Debts[]>(200, 'ok', debts[1], debts[0]);
  }

  async getSomeMonth(query: GetSomeMonthDebtQueryDto) {
    const { page, limit, year, month } = query;

    const skip: number = (+page - 1) * +limit;

    const startOfTheDay: Date = moment({ year: +year, month: +month - 1 })
      .tz(uzbTimeZone)
      .startOf('month')
      .toDate();

    const endOfTheDay: Date = moment({ year: +year, month: +month - 1 })
      .tz(uzbTimeZone)
      .endOf('month')
      .toDate();

    const debts: [Debts[], number] = await this.debtsEntity.findAndCount({
      order: { created_at: 'ASC' },
      where: {
        status: 'active',
        created_at: Between(startOfTheDay, endOfTheDay),
      },
      skip,
      take: +limit,
    });

    return responseWidthPagination<Debts[]>(200, 'ok', debts[1], debts[0]);
  }

  async getById(id: string) {
    const debts: Debts = await this.debtsEntity.findOne({
      where: { debt_id: +id },
    });

    if (!debts) throw new NotFoundException('not found');

    return response<Debts>(200, 'ok', debts);
  }

  async create(body: CreateDebtDto, user_id: number) {
    let debt: Debts = this.debtsEntity.create({ ...body, user_id });
    debt = await this.debtsEntity.save(debt);

    return response<Debts>(201, 'created', debt);
  }

  async update(body: UpdateDebtDto) {
    const debt = await this.debtsEntity.update(
      { debt_id: body.debt_id },
      {
        debt_amount: body.debt_amount,
        text: body.text,
      },
    );

    return response(200, 'updated', debt);
  }

  async delete(id: string) {
    const debt = await this.debtsEntity.update(
      { debt_id: +id },
      { status: 'delete' },
    );

    return response(200, 'deleted', debt);
  }

  async debtRepayment(body: RepaymentDebtDto) {
    const debt: Debts = await this.debtsEntity.findOne({
      where: { debt_id: body.debt_id },
    });

    if (!debt) throw new NotFoundException('not found');

    if (body.debt_type != debt.debt_type)
      throw new BadRequestException('debt_type is not the same');

    const number: number = +debt.debt_amount - +body.debt_amount;
    const debt_was_repaid_date: Date = moment().tz(uzbTimeZone).toDate();

    if (number <= 0) {
      const debt_was_repaid: boolean = true;
      const debt_amount: string = number.toString();

      const data = await this.debtsEntity.update(
        { debt_id: body.debt_id },
        { debt_amount, debt_was_repaid, debt_was_repaid_date },
      );

      return response(200, 'ok', data);
    }

    const debt_amount: string = number.toString();

    let data = await this.debtsEntity.update(
      { debt_id: body.debt_id },
      { debt_amount, debt_was_repaid_date },
    );

    return response(200, 'ok', data);
  }
}
