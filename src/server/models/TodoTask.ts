import {Entity} from "typeorm/decorator/entity/Entity";
import {Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class TodoTask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    content: string;

    @Column('text')
    description: string;

    @Column()
    isCompleted: boolean;
}