import 'moment-timezone';
import * as moment from 'moment';
import { DocumentsCategories } from './documents.categories.entity';
import { DocumentsSubCategories } from './documents.sub.categories.entity';
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

@Entity({ name: 'documents' })
export class Documents extends BaseEntity {
  @PrimaryGeneratedColumn()
  document_id: number;

  @Column()
  @ManyToOne(() => DocumentsCategories, (category) => category.category_id)
  @JoinColumn({ name: 'category_id' })
  category_id: DocumentsCategories | number;

  @Index()
  @Column()
  @ManyToOne(
    () => DocumentsSubCategories,
    (sub_category) => sub_category.sub_category_id,
  )
  @JoinColumn({ name: 'sub_category_id' })
  sub_category_id: DocumentsSubCategories | number;

  @Column({
    type: 'text',
  })
  file: string;

  @Index()
  @Column({
    type: 'varchar',
  })
  mime_type: string;

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
