import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsCategories } from 'src/entities';
import { DocumentCategoriesService } from './document.categories.service';
import { DocumentCategoriesController } from './document.categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentsCategories])],
  controllers: [DocumentCategoriesController],
  providers: [DocumentCategoriesService],
})
export class DocumentCategoriesModule {}
