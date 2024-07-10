import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { Documents } from 'src/entities';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { response, responseWidthPagination } from 'src/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateDocumentsDto,
  UpdateDocumentsDto,
  GetAllDocumentsQueryDto,
  GetByTextDocumentsQueryDto,
  GetBySubCategorytDocumentsQueryDto,
} from './dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Documents)
    private readonly documentEntity: Repository<Documents>,
  ) {}

  async getAll(query: GetAllDocumentsQueryDto) {
    const { page, limit, status } = query;

    const skip: number = (+page - 1) * +limit;

    const documents: [Documents[], number] =
      await this.documentEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { status },
        skip,
        take: +limit,
      });

    return responseWidthPagination<Documents[]>(
      200,
      'ok',
      documents[1],
      documents[0],
    );
  }

  async getByText(query: GetByTextDocumentsQueryDto) {
    const { page, limit, text } = query;

    const skip: number = (+page - 1) * +limit;

    const documents: [Documents[], number] =
      await this.documentEntity.findAndCount({
        where: { text: ILike(`%${text}%`), status: 'active' },
        skip,
        take: +limit,
      });

    return responseWidthPagination<Documents[]>(
      200,
      'ok',
      documents[1],
      documents[0],
    );
  }

  async getBySubCategory(query: GetBySubCategorytDocumentsQueryDto) {
    const { page, limit, id } = query;

    const skip: number = (+page - 1) * +limit;

    const documents: [Documents[], number] =
      await this.documentEntity.findAndCount({
        order: { created_at: 'DESC' },
        where: { sub_category_id: +id, status: 'active' },
        skip,
        take: +limit,
      });

    return responseWidthPagination<Documents[]>(
      200,
      'ok',
      documents[1],
      documents[0],
    );
  }

  async getById(id: string) {
    const documents: Documents = await this.documentEntity.findOne({
      where: { document_id: +id },
    });

    if (!documents) throw new NotFoundException('not found');

    return response<Documents>(200, 'ok', documents);
  }

  async readFile(filename: string): Promise<Buffer> {
    const readFileAsync = promisify(fs.readFile);
    const filePath = path.join(process.cwd(), 'uploades', filename);

    try {
      const file = await readFileAsync(filePath);
      return file;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  }

  async uploadFile(
    body: CreateDocumentsDto,
    files: { file: string; mime_type: string },
  ) {
    let file = this.documentEntity.create({
      category_id: +body.category_id,
      sub_category_id: +body.sub_category_id,
      text: body.text,
      ...files,
    });

    file = await this.documentEntity.save(file);

    return response<Documents>(201, 'created', file);
  }

  async update(body: UpdateDocumentsDto) {
    const document = await this.documentEntity.update(
      { document_id: body.document_id },
      { text: body.text },
    );

    return response(200, 'updated', document);
  }

  async delete(id: string) {
    const document = await this.documentEntity.update(
      { document_id: +id },
      { status: 'delete' },
    );

    return response(200, 'deleted', document);
  }

  async isActive(id: string) {
    const document = await this.documentEntity.update(
      { document_id: +id },
      { status: 'active' },
    );

    return response(200, 'activated', document);
  }
}
