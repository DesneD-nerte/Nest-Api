import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import CreateUserDto from "./dto/create-user.dto";
import { User } from "./user.entity";
import bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>;
  private dataSource: DataSource;

  constructor(@InjectRepository(User) usersRepository: Repository<User>, dataSource: DataSource) {
    this.usersRepository = usersRepository;
    this.dataSource = dataSource;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User>;

  async findOne(email: string): Promise<User>;

  async findOne(arg: number | string) {
    const email = String(arg);
    const id = Number(arg);

    return await this.usersRepository.findOneBy([{ email } || { id }]);
  }

  async removeOne(id: number) {
    const deleteResult = await this.usersRepository.delete(id);

    return deleteResult;
  }

  async createOne(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);

    await this.dataSource.transaction(async (manager) => {
      await manager.save(user);
    });

    return user;
  }

  async createMany(createUsersDto: CreateUserDto[]) {
    const users = new Array<User>();

    for (const createUserDto of createUsersDto) {
      const user = new User(createUserDto);

      users.push(user);
    }

    await this.dataSource.transaction(async (manager) => {
      for (const user of users) {
        await manager.save(user);
      }
    });

    return users;
  }
}
