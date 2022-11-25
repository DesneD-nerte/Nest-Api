import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "../users/user.entity";

@Entity()
export class UserPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  url: string;

  @ManyToOne((type) => User, (user) => user.photos)
  user: User;
}
