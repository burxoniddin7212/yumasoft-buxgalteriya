import 'moment-timezone';
import * as moment from 'moment';
import { ExpensesCategories } from './expenses.categories.entity';
import { ExpensesSubCategories } from './expenses.sub.categories.entity';
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

@Entity({ name: 'expenses' })
export class Expenses extends BaseEntity {
  @PrimaryGeneratedColumn()
  expense_id: number;

  @Column()
  @ManyToOne(() => Users, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: Users | number;

  @Index()
  @Column()
  @ManyToOne(() => ExpensesCategories, (category) => category.category_id)
  @JoinColumn({ name: 'category_id' })
  category_id: ExpensesCategories | number;

  @Index()
  @Column()
  @ManyToOne(
    () => ExpensesSubCategories,
    (sub_category) => sub_category.sub_category_id,
  )
  @JoinColumn({ name: 'sub_category_id' })
  sub_category_id: ExpensesSubCategories | number;

  @Index()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  cash: string | null;

  @Index()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  usd: string | null;

  @Index()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  plastik: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  usd_kurs: string | null;

  @Column({
    type: 'varchar',
    default: 'active',
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
