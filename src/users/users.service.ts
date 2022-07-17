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

    constructor( @InjectRepository(User) usersRepository: Repository<User>, dataSource: DataSource ) {
        this.usersRepository = usersRepository;
        this.dataSource = dataSource;
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    async remove (id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async createOne(createUserDto: CreateUserDto) {
        const user = new User(createUserDto);

        await this.dataSource.transaction(async (manager) => {
            await manager.save(user);
        })
    }

    async createMany(createUsersDto: CreateUserDto[]) {
        const users = new Array<User> ();
        
        for (const createUserDto of createUsersDto) {
            const user = new User(createUserDto);

            users.push(user);
        }

        await this.dataSource.transaction(async (manager) => {
            for (const user of users) {
                await manager.save(user);
            }
        })
    }
}