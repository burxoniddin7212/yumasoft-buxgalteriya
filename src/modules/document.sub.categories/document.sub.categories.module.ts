import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsSubCategories } from 'src/entities';
import { DocumentSubCategoriesService } from './document.sub.categories.service';
import { DocumentSubCategoriesController } from './document.sub.categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentsSubCategories])],
  controllers: [DocumentSubCategoriesController],
  providers: [DocumentSubCategoriesService],
})
export class DocumentSubCategoriesModule {}
