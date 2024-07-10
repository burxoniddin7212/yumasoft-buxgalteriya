import { Module } from '@nestjs/common';
import { Documents } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Documents])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
