import { Repository } from 'typeorm';
import { response } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentsSubCategories } from 'src/entities';
import {
  CreateDocumentSubCategoryDto,
  UpdateDocumentSubCategoryDto,
} from './dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class DocumentSubCategoriesService {
  constructor(
    @InjectRepository(DocumentsSubCategories)
    private readonly subCategoryEntity: Repository<DocumentsSubCategories>,
  ) {}

  async getAll(status: string) {
    const subCategory: DocumentsSubCategories[] =
      await this.subCategoryEntity.find({ where: { status } });

    return response<DocumentsSubCategories[]>(200, 'ok', subCategory);
  }

  async getById(id: string) {
    const subCategory: DocumentsSubCategories =
      await this.subCategoryEntity.findOne({
        where: { sub_category_id: +id },
      });

    if (!subCategory) throw new NotFoundException('not found');

    return response<DocumentsSubCategories>(200, 'ok', subCategory);
  }

  async getByCategoryId(id: string) {
    const subCategory: DocumentsSubCategories[] =
      await this.subCategoryEntity.find({
        where: { category_id: +id, status: 'active' },
      });

    if (!subCategory) throw new NotFoundException('not found');

    return response<DocumentsSubCategories[]>(200, 'ok', subCategory);
  }

  async create(body: CreateDocumentSubCategoryDto) {
    const cheek: DocumentsSubCategories = await this.subCategoryEntity.findOne({
      where: { name: body.name },
    });

    if (cheek) throw new BadRequestException('this name is busy');

    let subCategory = this.subCategoryEntity.create(body);
    subCategory = await this.subCategoryEntity.save(subCategory);

    return response<DocumentsSubCategories>(201, 'created', subCategory);
  }

  async update(body: UpdateDocumentSubCategoryDto) {
    const cheek: DocumentsSubCategories = await this.subCategoryEntity.findOne({
      where: { sub_category_id: body.sub_category_id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const subCategory = await this.subCategoryEntity.update(
      body.sub_category_id,
      { name: body.name },
    );

    return response(200, 'updated', subCategory);
  }

  async delete(id: string) {
    const cheek: DocumentsSubCategories = await this.subCategoryEntity.findOne({
      where: { sub_category_id: +id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const subCategory = await this.subCategoryEntity.update(+id, {
      status: 'delete',
    });

    return response(200, 'deleted', subCategory);
  }

  async isActive(id: string) {
    const cheek: DocumentsSubCategories = await this.subCategoryEntity.findOne({
      where: { sub_category_id: +id },
    });

    if (!cheek) throw new NotFoundException('not found');

    const subCategory = await this.subCategoryEntity.update(+id, {
      status: 'active',
    });

    return response(200, 'activated', subCategory);
  }
}
