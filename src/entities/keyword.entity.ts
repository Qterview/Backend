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

import { Posts } from './posts.entity.js';

@Entity()
@Unique(['postId'])
export class Keywords extends BaseEntity {
  @PrimaryColumn()
  postId: number;

  @Column({ length: 15 })
  keyword: string;

  // @ManyToOne(() => Posts, (post) => post.keywords)
  // post: Posts;
}
