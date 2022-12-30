import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['postId'])
export class Posts extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    postId:number;

    @Column({length: 70})
    title:String;

    @Column({length: 500})
    content:string;

}