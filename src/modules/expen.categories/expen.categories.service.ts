import { Repository } from 'typeorm';
import { response } from 'src/common';
import { ExpensesCategories } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ExpenCategoriesService {
  constructor(
    @InjectRepository(ExpensesCategories)
    private readonly categoryEntity: Repository<ExpensesCategories>,
  ) {}

  async getAll(status: string) {
    const category: ExpensesCategories[] = await this.categoryEntity.find({
      where: { status },
    });

    return response<ExpensesCategories[]>(200, 'ok', category);
  }

  async getById(id: string) {
    const category: ExpensesCategories = await this.categoryEntity.findOne({
      where: { category_id: +id },
    });

    if (!category) throw new NotFoundException('not found');

    return response<ExpensesCategories>(200, 'ok', category);
  }

  async create(body: CreateCategoryDto) {
    const cheekUnique: ExpensesCategories = await this.categoryEntity.findOne({
      where: body,
    });

    if (cheekUnique) throw new BadRequestException('name is unique');

    let category: ExpensesCategories = this.categoryEntity.create(body);
    category = await this.categoryEntity.save(category);

    return response<ExpensesCategories>(201, 'created', category);
  }

  async update(body: UpdateCategoryDto) {
    const cheek: ExpensesCategories = await this.categoryEntity.findOne({
      where: { category_id: body.category_id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const category = await this.categoryEntity.update(body.category_id, {
      name: body.name,
    });

    return response(200, 'updated', category);
  }

  async delete(id: string) {
    const cheek: ExpensesCategories = await this.categoryEntity.findOne({
      where: { category_id: +id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const category = await this.categoryEntity.update(+id, {
      status: 'delete',
    });

    return response(200, 'deleted', category);
  }

  async isActive(id: string) {
    const cheek: ExpensesCategories = await this.categoryEntity.findOne({
      where: { category_id: +id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const category = await this.categoryEntity.update(+id, {
      status: 'active',
    });

    return response(200, 'activated', category);
  }
}
