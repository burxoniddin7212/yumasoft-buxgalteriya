import * as moment from 'moment';
import { MyDebts } from 'src/entities';
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
  CreateMyDebtDto,
  UpdateMyDebtDto,
  RepaymentMyDebtDto,
  GetAllMyDebtQueryDto,
  GetSomeMonthMyDebtQueryDto,
} from './dto';

@Injectable()
export class MyDebtsService {
  constructor(
    @InjectRepository(MyDebts)
    private readonly myDebtsEntity: Repository<MyDebts>,
  ) {}

  async getAll(query: GetAllMyDebtQueryDto) {
    const { page, limit, status } = query;

    const skip: number = (+page - 1) * +limit;

    const myDebts: [MyDebts[], number] = await this.myDebtsEntity.findAndCount({
      order: { created_at: 'DESC' },
      where: { status },
      skip,
      take: +limit,
    });

    return responseWidthPagination<MyDebts[]>(
      200,
      'ok',
      myDebts[1],
      myDebts[0],
    );
  }

  async getById(id: string) {
    const myDebts: MyDebts = await this.myDebtsEntity.findOne({
      where: { my_debt_id: +id },
    });

    if (!myDebts) throw new NotFoundException('not found');

    return response<MyDebts>(200, 'ok', myDebts);
  }

  async getSomeMonth(query: GetSomeMonthMyDebtQueryDto) {
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

    const myDebts: [MyDebts[], number] = await this.myDebtsEntity.findAndCount({
      order: { created_at: 'ASC' },
      where: {
        status: 'active',
        created_at: Between(startOfTheDay, endOfTheDay),
      },
      skip,
      take: +limit,
    });

    return responseWidthPagination<MyDebts[]>(
      200,
      'ok',
      myDebts[1],
      myDebts[0],
    );
  }

  async create(body: CreateMyDebtDto, user_id: number) {
    let debt: MyDebts = this.myDebtsEntity.create({ ...body, user_id });
    debt = await this.myDebtsEntity.save(debt);

    return response<MyDebts>(201, 'created', debt);
  }

  async update(body: UpdateMyDebtDto) {
    const myDebt = await this.myDebtsEntity.update(
      { my_debt_id: body.my_debt_id },
      {
        debt_amount: body.debt_amount,
        text: body.text,
      },
    );

    return response(200, 'updated', myDebt);
  }

  async delete(id: string) {
    const myDebt = await this.myDebtsEntity.update(
      { my_debt_id: +id },
      { status: 'delete' },
    );

    return response(200, 'deleted', myDebt);
  }

  async myDebtRepayment(body: RepaymentMyDebtDto) {
    const my_debt: MyDebts = await this.myDebtsEntity.findOne({
      where: { my_debt_id: body.my_debt_id },
    });

    if (!my_debt) throw new NotFoundException('not found');

    if (body.debt_type != my_debt.debt_type)
      throw new BadRequestException('my_debt_type is not the same');

    const number: number = +my_debt.debt_amount - +body.debt_amount;

    const debt_was_repaid_date: Date = moment().tz(uzbTimeZone).toDate();

    if (number <= 0) {
      const debt_was_repaid: boolean = true;

      const debt_amount: string = number.toString();

      const data = await this.myDebtsEntity.update(
        { my_debt_id: body.my_debt_id },
        { debt_amount, debt_was_repaid, debt_was_repaid_date },
      );

      return response(200, 'ok', data);
    }

    const debt_amount: string = number.toString();

    const data = await this.myDebtsEntity.update(
      { my_debt_id: body.my_debt_id },
      { debt_amount, debt_was_repaid_date },
    );

    return response(200, 'ok', data);
  }
}
