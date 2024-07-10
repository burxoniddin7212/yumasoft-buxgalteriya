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

@Entity({ name: 'documents_categories' })
export class DocumentsCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

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
