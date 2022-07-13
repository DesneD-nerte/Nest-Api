import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
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


    async createMany(users: User[]) {
        // const queryRunner = this.dataSource.createQueryRunner();

        // await queryRunner.connect();
        // await queryRunner.startTransaction();

        // try {
        //     await queryRunner.manager.save(users[0]);
        //     await queryRunner.manager.save(users[1]);

        //     await queryRunner.commitTransaction();
        // } catch (err) {
        //     await queryRunner.rollbackTransaction();
        // } finally {
        //     await queryRunner.release();
        // }

        
    }
}