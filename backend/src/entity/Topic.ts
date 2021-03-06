import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import Community from "./Community";

// Communities can have 1 primary topic and up to 25 subtopics
// So many to many relationship, but we need JoinTable to mark certain relationships as "primary"

@Entity()
export default class Topic {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique : true})
    name : string;

    @Column()
    icon : string; // Font awesome class name

    @OneToMany(() => TopicToCommunity, topicToCommunity => topicToCommunity.topic)
    topicToCommunities: TopicToCommunity[];
}

@Entity()
export class TopicToCommunity {

    @PrimaryGeneratedColumn()
    topicToCommunityId: number;

    @Column()
    topicId : number;

    @Column()
    communityId : number;

    @Column()
    primary : boolean;

    @ManyToOne(() => Topic, topic => topic.topicToCommunities)
    topic: Topic;

    @ManyToOne(() => Community, community => community.topicToCommunities)
    community: Community;
}