import 'moment-timezone';
import * as moment from 'moment';
import { NotesCategories } from './notes.categories.entity';
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

@Entity({ name: 'notes_sub_categories' })
export class NotesSubCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  sub_category_id: number;

  @Column()
  @ManyToOne(() => NotesCategories, (category) => category.category_id)
  @JoinColumn({ name: 'category_id' })
  category_id: NotesCategories | number;

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
