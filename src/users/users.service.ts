import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import CreateUserDto from "./dto/create-user.dto";
import { User } from "./user.entity";

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


    async createMany(createUsersDto: CreateUserDto[]) {
        const users = new Array<User> ();
        
        for (const createUserDto of createUsersDto) {
            const user = new User();

            for (const property in createUserDto) {
                if (Object.prototype.hasOwnProperty.call(createUserDto, property)) {
                    user[property] = createUserDto[property];
                }
            }
            users.push(user);
        }

        await this.dataSource.transaction(async (manager) => {
            for (const user of users) {
                await manager.save(user);
            }
        })
    }
}