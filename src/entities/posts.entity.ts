import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Keywords } from './keyword.entity';

@Entity()
@Unique(['postId'])
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  postId: number;

  @Column({ length: 70 })
  title: string;

  @Column({ length: 500 })
  content: string;

  @OneToMany(() => Keywords, (keyword) => keyword.post)
  keywords: Keywords[];
}
