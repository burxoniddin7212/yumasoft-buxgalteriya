import { RolesNames } from 'src/config';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import { DocumentSubCategoriesService } from './document.sub.categories.service';
import {
  CreateDocumentSubCategoryDto,
  UpdateDocumentSubCategoryDto,
} from './dto';
import {
  Put,
  Get,
  Body,
  Post,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  Query,
} from '@nestjs/common';

@Controller('document_sub_cat')
@UseGuards(MyJwtGuard, RoleGuard)
export class DocumentSubCategoriesController {
  constructor(private readonly service: DocumentSubCategoriesService) {}

  @Roles(RolesNames.superAdmin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('status') status: string = 'active') {
    return await this.service.getAll(status);
  }

  @Roles(RolesNames.superAdmin)
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Roles(RolesNames.superAdmin)
  @Get('category_id/:id')
  @HttpCode(HttpStatus.OK)
  async getByCategoryId(@Param('id') id: string) {
    return await this.service.getByCategoryId(id);
  }

  @Roles(RolesNames.superAdmin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateDocumentSubCategoryDto) {
    return await this.service.create(body);
  }

  @Roles(RolesNames.superAdmin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateDocumentSubCategoryDto) {
    return await this.service.update(body);
  }

  @Roles(RolesNames.superAdmin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Roles(RolesNames.superAdmin)
  @Put('is_active/:id')
  @HttpCode(HttpStatus.OK)
  async isActive(@Param('id') id: string) {
    return await this.service.isActive(id);
  }
}
