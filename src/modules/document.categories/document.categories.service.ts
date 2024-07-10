import { Repository } from 'typeorm';
import { response } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentsCategories } from 'src/entities';
import { CreateDocumentCategoryDto, UpdateDocumentCategoryDto } from './dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class DocumentCategoriesService {
  constructor(
    @InjectRepository(DocumentsCategories)
    private readonly categoryEntity: Repository<DocumentsCategories>,
  ) {}

  async getAll(status: string) {
    const category: DocumentsCategories[] = await this.categoryEntity.find({
      where: { status },
    });

    return response<DocumentsCategories[]>(200, 'ok', category);
  }

  async getById(id: string) {
    const category: DocumentsCategories = await this.categoryEntity.findOne({
      where: { category_id: +id },
    });

    if (!category) throw new NotFoundException('not found');

    return response<DocumentsCategories>(200, 'ok', category);
  }

  async create(body: CreateDocumentCategoryDto) {
    const cheekUnique: DocumentsCategories = await this.categoryEntity.findOne({
      where: body,
    });

    if (cheekUnique) throw new BadRequestException('name is unique');

    let category: DocumentsCategories = this.categoryEntity.create(body);
    category = await this.categoryEntity.save(category);

    return response<DocumentsCategories>(201, 'created', category);
  }

  async update(body: UpdateDocumentCategoryDto) {
    const cheek: DocumentsCategories = await this.categoryEntity.findOne({
      where: { category_id: body.category_id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const category = await this.categoryEntity.update(body.category_id, {
      name: body.name,
    });

    return response(200, 'updated', category);
  }

  async delete(id: string) {
    const cheek: DocumentsCategories = await this.categoryEntity.findOne({
      where: { category_id: +id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const category = await this.categoryEntity.update(+id, {
      status: 'delete',
    });

    return response(200, 'deleted', category);
  }

  async isActive(id: string) {
    const cheek: DocumentsCategories = await this.categoryEntity.findOne({
      where: { category_id: +id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const category = await this.categoryEntity.update(+id, {
      status: 'active',
    });

    return response(200, 'activated', category);
  }
}
