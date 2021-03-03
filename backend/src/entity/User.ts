import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique : true, nullable : true}) // Regex validation not done here. Email not required on Reddit
    email: string;

    @Column({unique : true, update : false}) // You cannot edit your username
    username: string;

    @Column()
    password: string; // No length validation done here as we store hashed version

    @CreateDateColumn()
    dateJoined: Date; // For cake day. Stores in UTC

}
