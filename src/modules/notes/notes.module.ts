import { Notes } from 'src/entities';
import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './notes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notes])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
