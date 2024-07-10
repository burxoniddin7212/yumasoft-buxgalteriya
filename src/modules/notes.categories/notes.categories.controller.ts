import { RolesNames } from 'src/config';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import { NotesCategoriesService } from './notes.categories.service';
import { CreateNotesCategoryDto, UpdateNotesCategoryDto } from './dto';
import {
  Put,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

@Controller('notes_category')
@UseGuards(MyJwtGuard, RoleGuard)
export class NotesCategoriesController {
  constructor(private readonly service: NotesCategoriesService) {}

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('status') status: string = 'active') {
    return await this.service.getAll(status);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Roles(RolesNames.superAdmin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async registerUsers(@Body() body: CreateNotesCategoryDto) {
    return await this.service.create(body);
  }

  @Roles(RolesNames.superAdmin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateNotesCategoryDto) {
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
