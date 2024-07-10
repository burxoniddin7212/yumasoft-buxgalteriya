import { Debts } from 'src/entities';
import { Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtsController } from './debts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Debts])],
  controllers: [DebtsController],
  providers: [DebtsService],
})
export class DebtsModule {}
