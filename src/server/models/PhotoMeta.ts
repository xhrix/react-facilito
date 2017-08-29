import {Entity} from "typeorm/decorator/entity/Entity";
import {Column, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Photo from "./Photo";

@Entity()
export default class PhotoMeta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    height: number;

    @Column('int')
    width: number;

    @Column()
    orientation: string;

    @Column()
    compressed: boolean;

    @Column()
    comment: string;

    @OneToOne(type => Photo, photo => photo.metadata, {
        // cascadeRemove: true, // TODO: I've not been able to make it work.
        // cascadeUpdate: true, // TODO: I've not been able to make it work.
        // cascadeInsert: true, // TODO: I've not been able to make it work.
        onDelete: "CASCADE",
        // cascadeAll: true, // TODO: I've not been able to make it work.
        nullable: false
    })
    @JoinColumn({name: 'photo'}) // This is the owner of the relation, the 'JoinColumn' decorator goes in the relationship owner
    photo: Photo;
}