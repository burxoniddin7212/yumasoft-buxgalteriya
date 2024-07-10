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

@Entity({ name: 'prepayment' })
export class Prepayment extends BaseEntity {
  @PrimaryGeneratedColumn()
  prepayment_id: number;

  @Index()
  @Column()
  @ManyToOne(() => Users, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: Users | number;

  @Column({
    type: 'integer',
  })
  prepayment_amount: number;

  @Column({
    type: 'varchar',
  })
  prepayment_type: string;

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
