import { Module, forwardRef } from '@nestjs/common';
import { Common, Expenses } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { CommonService } from '../common/common.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expenses]),
    forwardRef(() => CommonModule),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
