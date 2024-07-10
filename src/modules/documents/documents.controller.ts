import { Response } from 'express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { RolesNames } from 'src/config';
import { DocumentsService } from './documents.service';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateDocumentsDto,
  UpdateDocumentsDto,
  GetAllDocumentsQueryDto,
  GetByTextDocumentsQueryDto,
  GetBySubCategorytDocumentsQueryDto,
} from './dto';
import {
  Put,
  Res,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@Controller('documents')
@UseGuards(MyJwtGuard, RoleGuard)
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @Roles(RolesNames.superAdmin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() query: GetAllDocumentsQueryDto) {
    return await this.service.getAll(query);
  }

  @Roles(RolesNames.superAdmin)
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Roles(RolesNames.superAdmin)
  @Get('text')
  @HttpCode(HttpStatus.OK)
  async getByText(@Query() query: GetByTextDocumentsQueryDto) {
    return await this.service.getByText(query);
  }

  @Roles(RolesNames.superAdmin)
  @Get('sub_category')
  @HttpCode(HttpStatus.OK)
  async getBySubCategory(@Query() query: GetBySubCategorytDocumentsQueryDto) {
    return await this.service.getBySubCategory(query);
  }

  @Roles(RolesNames.superAdmin)
  @Get('download/:filename')
  @HttpCode(HttpStatus.OK)
  async download(@Param('filename') filename: string, @Res() res: Response) {
    const file = await this.service.readFile(filename);
    res.setHeader('Content-Type', extname(filename));
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.send(file);
  }

  @Roles(RolesNames.superAdmin)
  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploades'),
        filename: async (req, file, cb) => {
          const random = Math.floor(10000 + Math.random() * 90000);
          const uniqueName =
            random.toString() + Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file, @Body() body: CreateDocumentsDto) {
    return await this.service.uploadFile(body, {
      file: file.filename,
      mime_type: file.mimetype,
    });
  }

  @Roles(RolesNames.superAdmin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateDocumentsDto) {
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
