import { MyDebts } from 'src/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyDebtsService } from './my.debts.service';
import { MyDebtsController } from './my.debts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MyDebts])],
  controllers: [MyDebtsController],
  providers: [MyDebtsService],
})
export class MyDebtsModule {}
