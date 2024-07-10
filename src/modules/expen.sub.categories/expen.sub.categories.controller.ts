import { RolesNames } from 'src/config';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from './dto';
import { ExpenSubCategoriesService } from './expen.sub.categories.service';
import {
  Put,
  Get,
  Body,
  Post,
  Param,
  Query,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

@Controller('expen_sub_category')
@UseGuards(MyJwtGuard, RoleGuard)
export class ExpenSubCategoriesController {
  constructor(private readonly service: ExpenSubCategoriesService) {}

  @Roles(RolesNames.superAdmin, RolesNames.admin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('status') status: string = 'active') {
    return await this.service.getAll(status);
  }

  @Roles(RolesNames.superAdmin, RolesNames.admin)
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Roles(RolesNames.superAdmin, RolesNames.admin)
  @Get('category_id/:id')
  @HttpCode(HttpStatus.OK)
  async getByCategoryId(@Param('id') id: string) {
    return await this.service.getByCategoryId(id);
  }

  @Roles(RolesNames.superAdmin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateSubCategoryDto) {
    return await this.service.create(body);
  }

  @Roles(RolesNames.superAdmin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateSubCategoryDto) {
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
