import { User } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserPhoto {
  id: number;

  name: string;

  createdAt: Date;

  url: string;

  user: User;
}
