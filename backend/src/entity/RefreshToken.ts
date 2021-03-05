import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity()
export default class RefreshToken {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, {nullable : false, onDelete : "CASCADE"})
    @JoinColumn()
    owner: User;

    @Column({type : "text"})
    token : string;
}
