import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesSubCategories } from 'src/entities';
import { NotesSubCategoriesService } from './notes.sub.categories.service';
import { NotesSubCategoriesController } from './notes.sub.categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotesSubCategories])],
  controllers: [NotesSubCategoriesController],
  providers: [NotesSubCategoriesService],
})
export class NotesSubCategoriesModule {}
