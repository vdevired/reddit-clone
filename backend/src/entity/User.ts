import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";
import Community from "./Community";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique : true, nullable : true}) // Regex validation not done here, done in frontend and route. Email not required on Reddit
    email: string;

    @Column({unique : true, update : false, type : "varchar", length : 20}) // You cannot edit your username. Max username length is 20
    username: string;

    @Column()
    password: string; // No length validation done here as we store hashed version

    @CreateDateColumn()
    dateJoined: Date; // For cake day. Stores in UTC

    @OneToMany(() => Community, community => community.owner)
    communities: Community[];

}
