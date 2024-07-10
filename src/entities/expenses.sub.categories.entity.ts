import 'moment-timezone';
import * as moment from 'moment';
import { ExpensesCategories } from './expenses.categories.entity';
import {
  Index,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'expenses_sub_categories' })
export class ExpensesSubCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  sub_category_id: number;

  @Column()
  @ManyToOne(() => ExpensesCategories, (category) => category.category_id)
  @JoinColumn({ name: 'category_id' })
  category_id: ExpensesCategories | number;

  @Index()
  @Column({
    type: 'varchar',
  })
  name: string;

  @Index()
  @Column({
    type: 'varchar',
    default: 'active',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
