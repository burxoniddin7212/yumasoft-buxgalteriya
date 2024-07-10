import { Repository } from 'typeorm';
import { response } from 'src/common';
import { NotesCategories } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotesCategoryDto, UpdateNotesCategoryDto } from './dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class NotesCategoriesService {
  constructor(
    @InjectRepository(NotesCategories)
    private readonly notesCategoryEntity: Repository<NotesCategories>,
  ) {}

  async getAll(status: string) {
    const category: NotesCategories[] = await this.notesCategoryEntity.find({
      where: { status },
    });

    return response<NotesCategories[]>(200, 'ok', category);
  }

  async getById(id: string) {
    const category: NotesCategories = await this.notesCategoryEntity.findOne({
      where: { category_id: +id },
    });

    if (!category) throw new NotFoundException('not found');

    return response<NotesCategories>(200, 'ok', category);
  }

  async create(body: CreateNotesCategoryDto) {
    const cheekUnique: NotesCategories = await this.notesCategoryEntity.findOne(
      {
        where: body,
      },
    );

    if (cheekUnique) throw new BadRequestException('name is unique');

    let category: NotesCategories = this.notesCategoryEntity.create(body);
    category = await this.notesCategoryEntity.save(category);

    return response<NotesCategories>(201, 'created', category);
  }

  async update(body: UpdateNotesCategoryDto) {
    const cheek: NotesCategories = await this.notesCategoryEntity.findOne({
      where: { category_id: body.category_id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const category = await this.notesCategoryEntity.update(body.category_id, {
      name: body.name,
    });

    return response(200, 'updated', category);
  }

  async delete(id: string) {
    const cheek: NotesCategories = await this.notesCategoryEntity.findOne({
      where: { category_id: +id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const category = await this.notesCategoryEntity.update(+id, {
      status: 'delete',
    });

    return response(200, 'deleted', category);
  }

  async isActive(id: string) {
    const cheek: NotesCategories = await this.notesCategoryEntity.findOne({
      where: { category_id: +id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const category = await this.notesCategoryEntity.update(+id, {
      status: 'active',
    });

    return response(200, 'activated', category);
  }
}
