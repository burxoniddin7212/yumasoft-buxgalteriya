import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesCategories } from 'src/entities';
import { ExpenCategoriesService } from './expen.categories.service';
import { ExpenCategoriesController } from './expen.categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesCategories])],
  controllers: [ExpenCategoriesController],
  providers: [ExpenCategoriesService],
})
export class ExpenCategoriesModule {}
