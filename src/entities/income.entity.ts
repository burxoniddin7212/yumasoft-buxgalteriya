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

@Entity({ name: 'incomes' })
export class Incomes extends BaseEntity {
  @PrimaryGeneratedColumn()
  income_id: number;

  @Index()
  @Column({
    type: 'varchar',
  })
  client_id: string;

  @Index()
  @Column({
    type: 'varchar',
  })
  section_number: string;

  @Index()
  @Column({
    type: 'varchar',
  })
  weight: string;

  @Index()
  @Column({
    type: 'varchar',
  })
  cash: string;

  @Index()
  @Column({
    type: 'varchar',
  })
  usd: string;

  @Index()
  @Column({
    type: 'varchar',
  })
  plastik: string;

  @Index()
  @Column({
    type: 'text',
  })
  text: string;

  @Index()
  @Column({
    type: 'varchar',
    default: 'active',
  })
  status: string;

  @Index()
  @CreateDateColumn()
  created_at: Date;
}
