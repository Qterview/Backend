import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['userId', 'Id'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    userId:number;

    @Column({length: 40})
    Id:string;

    @Column()
    password:string;

    @Column({nullable: false, length: 40})
    name?:string;

    @Column({nullable: true, length: 40})
    phoneNumber?:string;

    @Column({nullable: true, length: 100})
    livingAt?:string;

}