import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPhoto } from "../userPhotos/userPhoto.entity";
import CreateUserDto from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
  id: number;

  firstName: string;

  lastName: string;

  password: string;

  email: string;

  isActive: boolean;

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
