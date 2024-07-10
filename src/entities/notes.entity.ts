import 'moment-timezone';
import * as moment from 'moment';
import { Users } from './users.entity';
import { NotesCategories } from './notes.categories.entity';
import { NotesSubCategories } from './notes.sub.categories.entity';
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

@Entity({ name: 'notes' })
export class Notes extends BaseEntity {
  @PrimaryGeneratedColumn()
  notes_id: number;

  @Index()
  @Column()
  @ManyToOne(() => NotesCategories, (category) => category.category_id)
  @JoinColumn({ name: 'category_id' })
  category_id: NotesCategories | number;

  @Index()
  @Column()
  @ManyToOne(
    () => NotesSubCategories,
    (sub_category) => sub_category.sub_category_id,
  )
  @JoinColumn({ name: 'sub_category_id' })
  sub_category_id: NotesSubCategories | number;

  @Index()
  @Column()
  @ManyToOne(() => Users, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: Users | number;

  @Index()
  @Column({
    type: 'text',
  })
  title: string;

  @Index()
  @Column({
    type: 'text',
  })
  text: string;

  @Index()
  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deadline: Date | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  file: string | null;

  @Index()
  @Column({
    type: 'boolean',
    default: false,
  })
  mission_accomplished: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  to_myself: boolean;

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
