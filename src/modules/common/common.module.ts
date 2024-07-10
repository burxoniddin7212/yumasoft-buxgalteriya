import { Common } from 'src/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Common])],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
