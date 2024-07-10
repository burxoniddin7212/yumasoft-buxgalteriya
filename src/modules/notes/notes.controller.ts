import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { RolesNames } from 'src/config';
import { NotesService } from './notes.service';
import { MyJwtGuard, RoleGuard, Roles } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateNotesDto,
  UpdateNotesDto,
  GetForAdminNotesDto,
  GetAllNotesQueryDto,
  DeadlineUpdateNotesDto,
  GetByTokenAnyDayNotesDto,
  GetBySubCategoryNotesDto,
  GetByTokenAllNotesQueryDto,
  GetByTokenThisDayNotesQueryDto,
} from './dto';
import {
  Put,
  Req,
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

@Controller('notes')
@UseGuards(MyJwtGuard, RoleGuard)
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() query: GetAllNotesQueryDto) {
    return await this.service.getAll(query);
  }

  @Roles(RolesNames.superAdmin)
  @Get('sub_categiry')
  @HttpCode(HttpStatus.OK)
  async getBySubCategoryAndOption(@Query() query: GetBySubCategoryNotesDto) {
    return await this.service.getBySubCategoryAndOption(query);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getByTokenThisDay(
    @Req() req,
    @Query() query: GetByTokenThisDayNotesQueryDto,
  ) {
    return await this.service.getByTokenThisDay(req?.user?.user_id, query);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('user/any_day')
  @HttpCode(HttpStatus.OK)
  async getByTokenAnyDay(@Req() req, @Query() query: GetByTokenAnyDayNotesDto) {
    return await this.service.getByTokenAnyDay(req?.user?.user_id, query);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Get('user/any_day/for_admin')
  @HttpCode(HttpStatus.OK)
  async getForAdmin(@Query() query: GetForAdminNotesDto) {
    return await this.service.getForAdmin(query);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Get('token_all')
  @HttpCode(HttpStatus.OK)
  async getByTokenAllNotes(
    @Req() req,
    @Query() query: GetByTokenAllNotesQueryDto,
  ) {
    return await this.service.getByTokenAllNotes(query, req?.user?.user_id);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Post('upload_file')
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
  async createWidthFile(@UploadedFile() file, @Body() body: CreateNotesDto) {
    return await this.service.createWidthFile(body, file.filename);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateNotesDto) {
    return await this.service.create(body);
  }

  @Roles(RolesNames.superAdmin)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateNotesDto) {
    return await this.service.update(body);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Put('deadline')
  @HttpCode(HttpStatus.OK)
  async updateDeadline(@Body() body: DeadlineUpdateNotesDto) {
    return await this.service.updateDeadline(body);
  }

  @Roles(RolesNames.admin, RolesNames.superAdmin)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Roles(RolesNames.user, RolesNames.admin, RolesNames.superAdmin)
  @Post('accomplished/:id')
  @HttpCode(HttpStatus.OK)
  async missionAccomplished(@Param('id') id: string) {
    return await this.service.missionAccomplished(id);
  }
}
