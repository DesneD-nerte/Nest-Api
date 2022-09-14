import { User } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserPhoto {
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
