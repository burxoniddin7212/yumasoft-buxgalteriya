import 'moment-timezone';
import * as moment from 'moment';
import { Notes } from 'src/entities';
import { uzbTimeZone } from 'src/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { response, responseWidthPagination } from 'src/common';
import { Repository, LessThanOrEqual, Between } from 'typeorm';
import {
  CreateNotesDto,
  UpdateNotesDto,
  GetForAdminNotesDto,
  GetAllNotesQueryDto,
  DeadlineUpdateNotesDto,
  GetByTokenAnyDayNotesDto,
  GetBySubCategoryNotesDto,
  GetByTokenAllNotesQueryDto,
  GetByTokenThisDayNotesQueryDto,
} from './dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes) private readonly notesEntity: Repository<Notes>,
  ) {}

  async getAll(query: GetAllNotesQueryDto) {
    const { page, limit, status, mission } = query;

    const skip: number = (+page - 1) * +limit;

    let mission_accomplished: boolean = false;

    if (mission == 'true') mission_accomplished = true;

    const notes: [Notes[], number] = await this.notesEntity.findAndCount({
      order: { created_at: 'DESC' },
      where: { mission_accomplished, status },
      skip,
      take: +limit,
    });

    return responseWidthPagination<Notes[]>(200, 'ok', notes[1], notes[0]);
  }

  async getBySubCategoryAndOption(query: GetBySubCategoryNotesDto) {
    const { sub_category_id, page = '1', limit = '50', year, month } = query;

    const skip: number = (+page - 1) * +limit;

    let notes: [Notes[], number];

    if (year != '0' && month != '0') {
      const startOfTheMonth: Date = moment({ year: +year, month: +month - 1 })
        .tz(uzbTimeZone)
        .startOf('month')
        .toDate();

      const endOfTheMonth: Date = moment({ year: +year, month: +month - 1 })
        .tz(uzbTimeZone)
        .endOf('month')
        .toDate();

      notes = await this.notesEntity.findAndCount({
        order: { created_at: 'ASC' },
        where: {
          status: 'active',
          sub_category_id: +sub_category_id,
          created_at: Between(startOfTheMonth, endOfTheMonth),
        },
        skip,
        take: +limit,
      });
    }

    if (year == '0' && month == '0') {
      notes = await this.notesEntity.findAndCount({
        order: { created_at: 'ASC' },
        where: {
          status: 'active',
          sub_category_id: +sub_category_id,
        },
        skip,
        take: +limit,
      });
    }

    return responseWidthPagination<Notes[]>(200, 'ok', notes[1], notes[0]);
  }

  async getById(id: string) {
    const notes: Notes = await this.notesEntity.findOne({
      where: { notes_id: +id },
    });

    if (!notes) throw new NotFoundException('not found');

    return response<Notes>(200, 'ok', notes);
  }

  async getByTokenThisDay(
    user_id: number,
    query: GetByTokenThisDayNotesQueryDto,
  ) {
    const { page, limit, mission } = query;

    const skip: number = (+page - 1) * +limit;

    let mission_accomplished: boolean = false;

    if (mission == 'true') mission_accomplished = true;

    const deadline: Date = moment().tz(uzbTimeZone).endOf('day').toDate();

    const notes: [Notes[], number] = await this.notesEntity.findAndCount({
      order: { deadline: 'ASC' },
      where: {
        user_id,
        status: 'active',
        mission_accomplished,
        deadline: LessThanOrEqual(deadline),
      },
      skip,
      take: +limit,
    });

    return responseWidthPagination<Notes[]>(200, 'ok', notes[1], notes[0]);
  }

  async getByTokenAnyDay(user_id: number, query: GetByTokenAnyDayNotesDto) {
    let { mission, page, limit } = query;

    let mission_accomplished: boolean = false;

    if (mission == 'true') mission_accomplished = true;

    const skip: number = (+page - 1) * +limit;

    const deadline: Date = moment({
      year: +query.year,
      month: +query.month - 1,
      day: +query.day,
    })
      .tz(uzbTimeZone)
      .endOf('day')
      .toDate();

    const notes: [Notes[], number] = await this.notesEntity.findAndCount({
      order: { deadline: 'ASC' },
      where: {
        user_id,
        status: 'active',
        mission_accomplished,
        deadline: LessThanOrEqual(deadline),
      },
      skip,
      take: +limit,
    });

    return responseWidthPagination<Notes[]>(200, 'ok', notes[1], notes[0]);
  }

  async getForAdmin(query: GetForAdminNotesDto) {
    const { mission, page, limit, user_id } = query;

    const skip: number = (+page - 1) * +limit;

    let mission_accomplished: boolean = false;

    if (mission == 'true') mission_accomplished = true;

    const notes: [Notes[], number] = await this.notesEntity.findAndCount({
      order: { deadline: 'ASC' },
      where: {
        user_id: +user_id,
        status: 'active',
        mission_accomplished,
      },
      skip,
      take: +limit,
    });

    return responseWidthPagination<Notes[]>(200, 'ok', notes[1], notes[0]);
  }

  async getByTokenAllNotes(query: GetByTokenAllNotesQueryDto, user_id: number) {
    const { mission, page, limit } = query;

    const skip: number = (+page - 1) * +limit;

    let mission_accomplished: boolean = false;

    if (mission == 'true') mission_accomplished = true;

    const notes: [Notes[], number] = await this.notesEntity.findAndCount({
      order: { deadline: 'ASC' },
      where: {
        user_id: user_id,
        status: 'active',
        mission_accomplished,
      },
      skip,
      take: +limit,
    });

    return responseWidthPagination<Notes[]>(200, 'ok', notes[1], notes[0]);
  }

  async createWidthFile(body: CreateNotesDto, file: string) {
    const { year, month, day } = body;

    const deadline: Date = moment({
      year: +year,
      month: +month - 1,
      day: +day,
    })
      .tz(uzbTimeZone)
      .endOf('day')
      .toDate();

    let to_myself: boolean;

    if (body.to_myself == 'true') to_myself = true;

    if (body.to_myself == 'false') to_myself = false;

    let notes: Notes = this.notesEntity.create({
      category_id: +body.category_id,
      sub_category_id: +body.sub_category_id,
      title: body.title,
      text: body.text,
      user_id: +body.user_id,
      deadline: deadline,
      to_myself,
      file,
    });

    notes = await this.notesEntity.save(notes);

    return response<Notes>(201, 'created', notes);
  }

  async create(body: CreateNotesDto) {
    const { year, month, day } = body;

    const deadline: Date = moment({
      year: +year,
      month: +month - 1,
      day: +day,
    })
      .tz(uzbTimeZone)
      .endOf('day')
      .toDate();

    let to_myself: boolean;

    if (body.to_myself == 'true') to_myself = true;

    if (body.to_myself == 'false') to_myself = false;

    let notes: Notes = this.notesEntity.create({
      category_id: +body.category_id,
      sub_category_id: +body.sub_category_id,
      title: body.title,
      text: body.text,
      user_id: +body.user_id,
      deadline: deadline,
      to_myself,
    });

    notes = await this.notesEntity.save(notes);

    return response<Notes>(201, 'created', notes);
  }

  async update(body: UpdateNotesDto) {
    const notes: Notes = await this.notesEntity.findOne({
      where: { notes_id: body.notes_id },
    });

    if (!notes) throw new NotFoundException('not found');

    const data = await this.notesEntity.update(
      { notes_id: body.notes_id },
      { title: body.title, text: body.text },
    );

    return response(200, 'updated', data);
  }

  async updateDeadline(body: DeadlineUpdateNotesDto) {
    const deadline: Date = moment({
      year: +body.year,
      month: +body.month - 1,
      day: +body.day,
    })
      .tz(uzbTimeZone)
      .endOf('day')
      .toDate();

    let data = await this.notesEntity.update(
      { notes_id: body.notes_id },
      { deadline: deadline },
    );

    return response(200, 'updated deadline', data);
  }

  async delete(id: string) {
    const data = await this.notesEntity.update(
      { notes_id: +id },
      { status: 'delete' },
    );

    return response(200, 'deleted', data);
  }

  async missionAccomplished(id: string) {
    const data = await this.notesEntity.update(
      { notes_id: +id },
      { mission_accomplished: true },
    );

    return response(200, 'mission_accomplished is true', data);
  }
}
