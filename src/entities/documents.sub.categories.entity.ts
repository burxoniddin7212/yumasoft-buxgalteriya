import 'moment-timezone';
import * as moment from 'moment';
import { DocumentsCategories } from './documents.categories.entity';
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

@Entity({ name: 'documents_sub_categories' })
export class DocumentsSubCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  sub_category_id: number;

  @Column()
  @ManyToOne(() => DocumentsCategories, (category) => category.category_id)
  @JoinColumn({ name: 'category_id' })
  category_id: DocumentsCategories | number;

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
