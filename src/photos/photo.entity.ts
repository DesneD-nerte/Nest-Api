import { Column, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
export class Photo {
  id: number;

  name: string;

  // @Column()
  // createdAt: Date;

  url: string;
}
