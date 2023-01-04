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

//게시물
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

//게시물 키워드
@Entity()
@Unique(['postId'])
export class Keywords extends BaseEntity {
  @PrimaryColumn()
  postId: number;

  @Column({ length: 15 })
  keyword: string;

  @ManyToOne(() => Posts, (post) => post.keywords)
  post: Posts;
}
