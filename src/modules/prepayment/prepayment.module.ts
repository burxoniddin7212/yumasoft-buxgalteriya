import { Module } from '@nestjs/common';
import { Prepayment } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrepaymentService } from './prepayment.service';
import { PrepaymentController } from './prepayment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prepayment])],
  controllers: [PrepaymentController],
  providers: [PrepaymentService],
})
export class PrepaymentModule {}
