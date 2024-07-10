import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesSubCategories } from 'src/entities';
import { ExpenSubCategoriesService } from './expen.sub.categories.service';
import { ExpenSubCategoriesController } from './expen.sub.categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesSubCategories])],
  controllers: [ExpenSubCategoriesController],
  providers: [ExpenSubCategoriesService],
})
export class ExpenSubCategoriesModule {}
