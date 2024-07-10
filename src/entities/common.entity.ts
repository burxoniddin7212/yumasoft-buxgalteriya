import 'moment-timezone';
import * as moment from 'moment';
import {
  Index,
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'common' })
export class Common extends BaseEntity {
  @PrimaryGeneratedColumn()
  common_id: number;

  @Index()
  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  text: string;

  @Column({
    type: 'varchar',
    default: 'active',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
