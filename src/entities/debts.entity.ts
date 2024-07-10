import 'moment-timezone';
import * as moment from 'moment';
import { Users } from './users.entity';
import {
  Index,
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'debts' })
export class Debts extends BaseEntity {
  @PrimaryGeneratedColumn()
  debt_id: number;

  @Column()
  @ManyToOne(() => Users, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: Users | number;

  @Column({
    type: 'text',
  })
  text: string;

  @Column({
    type: 'varchar',
  })
  debt_amount: string;

  @Column({
    type: 'varchar',
  })
  debt_type: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  debt_was_repaid: boolean;

  @Column({
    default: null,
    nullable: true,
    type: 'timestamp with time zone',
  })
  debt_was_repaid_date: Date;

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
