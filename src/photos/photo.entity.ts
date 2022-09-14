import { Column, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column()
  // createdAt: Date;

  @Column()
  url: string;
}
