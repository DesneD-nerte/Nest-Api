import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPhoto } from "../userPhotos/userPhoto.entity";
import CreateUserDto from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  isActive: boolean;

  @OneToMany((type) => UserPhoto, (photo) => photo.user)
  photos: UserPhoto[];

  constructor(createUserDto?: CreateUserDto) {
    if (createUserDto) {
      this.firstName = createUserDto.firstName;
      this.lastName = createUserDto.lastName;
      this.email = createUserDto.email;
      this.password = this.#generateHashPassword(createUserDto.password);
    }
  }

  #generateHashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }
}
