import { Repository } from 'typeorm';
import { Common } from 'src/entities';
import { response } from 'src/common';
import { UpdateUsdKursDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, Body } from '@nestjs/common';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(Common)
    private readonly commonEntity: Repository<Common>,
  ) {}

  async getUsdKurs() {
    const usdKurs: Common = await this.commonEntity.findOne({
      where: { name: 'usd_kurs' },
    });

    if (!usdKurs) throw new NotFoundException('not found');

    return response<Common>(200, 'ok', usdKurs);
  }

  async updateUsdKurs(body: UpdateUsdKursDto) {
    const check: Common = await this.commonEntity.findOne({
      where: { name: 'usd_kurs' },
    });

    if (!check) throw new NotFoundException('not found');

    const usdKurs = await this.commonEntity.update({ name: 'usd_kurs' }, body);

    return response(200, 'ok', usdKurs);
  }
}
