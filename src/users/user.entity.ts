import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPhoto } from "../userPhotos/userPhoto.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true})
    isActive: boolean

    @OneToMany((type) => UserPhoto, (photo) => photo.user)
    photos: UserPhoto[]
}