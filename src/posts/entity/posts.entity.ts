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

@Entity()
@Unique(['postId'])
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @OneToMany(() => Keywords, (keyword) => keyword.postId)
  postId: number;

  @Column({ length: 70 })
  title: string;

  @Column({ length: 500 })
  content: string;
}

@Entity()
@Unique(['postId'])
export class Keywords extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ManyToOne(() => Posts, (post) => post.postId)
  postId: number;

  @Column({ length: 15 })
  keyword: string;
}
