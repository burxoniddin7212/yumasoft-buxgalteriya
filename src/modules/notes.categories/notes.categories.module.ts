import { Module } from '@nestjs/common';
import { NotesCategories } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesCategoriesService } from './notes.categories.service';
import { NotesCategoriesController } from './notes.categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotesCategories])],
  controllers: [NotesCategoriesController],
  providers: [NotesCategoriesService],
})
export class NotesCategoriesModule {}
