import 'moment-timezone';
import * as moment from 'moment';
import { uzbTimeZone } from 'src/config';
import { Prepayment } from 'src/entities';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePrepaymentDto,
  UpdatePrepaymentDto,
  GetPrepaymentMonthDto,
  GetAllPrepaymentQueryhDto,
} from './dto';
import {
  response,
  responseWidthPagination,
  prepaymentColculateStatistics,
  responseWidthPaginationForPrepay,
} from 'src/common';

@Injectable()
export class PrepaymentService {
  constructor(
    @InjectRepository(Prepayment)
    private readonly prepaymentEntity: Repository<Prepayment>,
  ) {}

  async getAll(query: GetAllPrepaymentQueryhDto) {
    const { page, limit, status } = query;

    const skip: number = (+page - 1) * +limit;

    const prepayment: [Prepayment[], number] =
      await this.prepaymentEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { status },
        skip,
        take: +limit,
      });

    return responseWidthPagination<Prepayment[]>(
      200,
      'ok',
      prepayment[1],
      prepayment[0],
    );
  }

  async getById(id: string) {
    const prepayment: Prepayment = await this.prepaymentEntity.findOne({
      where: { prepayment_id: +id },
    });

    if (!prepayment) throw new NotFoundException('not found');

    return response<Prepayment>(200, 'ok', prepayment);
  }

  async getByToken(id: number) {
    const nowDate: Date = moment().tz(uzbTimeZone).toDate();

    const currentDate: Date = moment()
      .tz(uzbTimeZone)
      .startOf('month')
      .startOf('day')
      .startOf('second')
      .toDate();

    const prepayment: [Prepayment[], number] =
      await this.prepaymentEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: {
          user_id: id,
          status: 'active',
          created_at: Between(currentDate, nowDate),
        },
      });

    const statistics = await prepaymentColculateStatistics(prepayment);

    return responseWidthPaginationForPrepay<Prepayment[]>(200, 'ok', {
      count: prepayment[1],
      statistics: statistics,
      prepayments: prepayment[0],
    });
  }

  async getByUserId(query: GetPrepaymentMonthDto) {
    const startOfTheDay: Date = moment({
      year: +query.year,
      month: +query.month - 1,
    })
      .tz(uzbTimeZone)
      .startOf('month')
      .toDate();

    const endOfTheDay: Date = moment({
      year: +query.year,
      month: +query.month - 1,
    })
      .tz(uzbTimeZone)
      .endOf('month')
      .toDate();

    const prepayment: [Prepayment[], number] =
      await this.prepaymentEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: {
          user_id: +query.user_id,
          status: 'active',
          created_at: Between(startOfTheDay, endOfTheDay),
        },
      });

    const statistics = await prepaymentColculateStatistics(prepayment);

    return responseWidthPaginationForPrepay<Prepayment[]>(200, 'ok', {
      count: prepayment[1],
      statistics: statistics,
      prepayments: prepayment[0],
    });
  }

  async create(body: CreatePrepaymentDto) {
    let prepayment: Prepayment = this.prepaymentEntity.create(body);
    prepayment = await this.prepaymentEntity.save(prepayment);

    return response<Prepayment>(201, 'created', prepayment);
  }

  async update(body: UpdatePrepaymentDto) {
    const cheek: Prepayment = await this.prepaymentEntity.findOne({
      where: { prepayment_id: body.prepayment_id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const prepayment = await this.prepaymentEntity.update(
      { prepayment_id: body.prepayment_id },
      { prepayment_amount: body.prepayment_amount, text: body.text },
    );

    return response(200, 'updated', prepayment);
  }

  async delete(id: string) {
    const cheek: Prepayment = await this.prepaymentEntity.findOne({
      where: { prepayment_id: +id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const prepayment = await this.prepaymentEntity.update(
      { prepayment_id: +id },
      { status: 'delete' },
    );

    return response(200, 'deleted', prepayment);
  }
}
