import { Column, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
export abstract class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    size: string;

    @Column()
    color: string;

    @Column()
    gender: string;

    @Column()
    available: boolean;
}