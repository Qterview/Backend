import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['userId', 'Id'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  userKey: number;

  @Column({ length: 40 })
  userId: string;

  @Column()
  password: string;

  @Column({ nullable: false, length: 40 })
  name?: string;
}
