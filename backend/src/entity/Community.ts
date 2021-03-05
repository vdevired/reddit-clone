import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import User from "./User";

enum CommunityType {
    PUBLIC = "public",
    RESTRICTED = "restricted",
    PRIVATE = "private"
}

@Entity()
export default class Community {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique : true, update : false, type : "varchar", length : 21}) // Community names including capitalization cannot be changed.
    name: string;

    @Column({type : "text"})
    description: string;

    @Column({ type: "enum", enum : CommunityType, default : CommunityType.PUBLIC })
    communityType: CommunityType;

    @Column()
    isAdult: boolean;

    @CreateDateColumn()
    dateCreated: Date;

    @ManyToOne(() => User, user => user.communities, {nullable : false, onDelete : "CASCADE"})
    owner: User;

}