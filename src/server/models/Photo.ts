import {Entity} from "typeorm/decorator/entity/Entity";
import {Column, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import PhotoMeta from "./PhotoMeta";

@Entity()
export default class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 120})
    name: string;

    @Column('text')
    description: string;

    @Column()
    filename: string;

    @Column('int')
    views: number;

    @Column()
    isPublished: boolean;

    @Column({length: 6})
    color: string;

    @OneToOne(type => PhotoMeta, photoMeta => photoMeta.photo, {
        // cascadeRemove: true,
        // cascadeUpdate: true,
        // cascadeInsert: true,
        // onDelete: "CASCADE",
        // nullable: false
    })
    metadata: PhotoMeta;
}