import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Shorts } from "./shorts.entity";

@Injectable()
export class ShortsService {
    constructor(private dataSource: DataSource) {}

    async getAll() {
        return await this.dataSource.manager.find(Shorts);
    }

    async createNew() {
        const pants = new Shorts();

        pants.name = "Gold Coll";
        pants.color = "Green";
        pants.gender = "Women";
        pants.size = 40;
        pants.available = true;

        await this.dataSource.transaction( async (manager) => {
            await manager.save(pants);
        })
    }
}