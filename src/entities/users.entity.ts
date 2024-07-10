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

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  //user_id
  @PrimaryGeneratedColumn()
  user_id: number;

  //first_name
  @Column({
    type: 'varchar',
  })
  first_name: string;

  //last_name
  @Column({
    type: 'varchar',
  })
  last_name: string;

  //number
  @Index()
  @Column({
    type: 'varchar',
  })
  number: string;

  //password
  @Index()
  @Column({
    type: 'text',
  })
  password: string;

  //role
  @Column({
    type: 'varchar',
    default: 'user',
  })
  role: string;

  //status
  @Index()
  @Column({
    type: 'varchar',
    default: 'active',
  })
  status: string;

  //created_at
  @CreateDateColumn()
  created_at: Date;
}
