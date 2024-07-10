import { Incomes } from 'src/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Incomes])],
  controllers: [IncomesController],
  providers: [IncomesService],
})
export class IncomesModule {}
