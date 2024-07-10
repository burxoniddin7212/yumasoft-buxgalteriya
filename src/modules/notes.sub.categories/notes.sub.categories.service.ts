import { Repository } from 'typeorm';
import { response } from 'src/common';
import { NotesSubCategories } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotesSubCategoryDto, UpdateNotesSubCategoryDto } from './dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class NotesSubCategoriesService {
  constructor(
    @InjectRepository(NotesSubCategories)
    private readonly notesSubCategoryEntity: Repository<NotesSubCategories>,
  ) {}

  async getAll(status: string) {
    const subCategory: NotesSubCategories[] =
      await this.notesSubCategoryEntity.find({
        where: { status },
      });

    return response<NotesSubCategories[]>(200, 'ok', subCategory);
  }

  async getById(id: string) {
    const subCategory: NotesSubCategories =
      await this.notesSubCategoryEntity.findOne({
        where: { sub_category_id: +id },
      });

    if (!subCategory) throw new NotFoundException('not found');

    return response<NotesSubCategories>(200, 'ok', subCategory);
  }

  async getByCategoryId(id: string) {
    const subCategory: NotesSubCategories[] =
      await this.notesSubCategoryEntity.find({
        where: { category_id: +id },
      });

    if (!subCategory) throw new NotFoundException('not found');

    return response<NotesSubCategories[]>(200, 'ok', subCategory);
  }

  async create(body: CreateNotesSubCategoryDto) {
    const cheek: NotesSubCategories = await this.notesSubCategoryEntity.findOne(
      {
        where: { name: body.name },
      },
    );

    if (cheek) throw new BadRequestException('this name is busy');

    let subCategory: NotesSubCategories =
      this.notesSubCategoryEntity.create(body);
    subCategory = await this.notesSubCategoryEntity.save(subCategory);

    return response<NotesSubCategories>(201, 'created', subCategory);
  }

  async update(body: UpdateNotesSubCategoryDto) {
    const cheek: NotesSubCategories = await this.notesSubCategoryEntity.findOne(
      {
        where: { sub_category_id: body.sub_category_id },
      },
    );

    if (!cheek) throw new NotFoundException('not found');

    const subCategory = await this.notesSubCategoryEntity.update(
      body.sub_category_id,
      { name: body.name },
    );

    return response(200, 'updated', subCategory);
  }

  async delete(id: string) {
    const cheek: NotesSubCategories = await this.notesSubCategoryEntity.findOne(
      {
        where: { sub_category_id: +id },
      },
    );

    if (!cheek) throw new NotFoundException('not found');

    const subCategory = await this.notesSubCategoryEntity.update(+id, {
      status: 'delete',
    });

    return response(200, 'deleted', subCategory);
  }

  async isActive(id: string) {
    const cheek: NotesSubCategories = await this.notesSubCategoryEntity.findOne(
      {
        where: { sub_category_id: +id },
      },
    );

    if (!cheek) throw new NotFoundException('not found');

    const subCategory = await this.notesSubCategoryEntity.update(+id, {
      status: 'active',
    });

    return response(200, 'activated', subCategory);
  }
}
