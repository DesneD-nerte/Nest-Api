import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Pants } from "./pants.entity";

@Injectable()
export class PantsService {
    constructor(private dataSource: DataSource) {}

    async getAll() {
        return await this.dataSource.manager.find(Pants);
    }

    async createNew() {
        const pants = new Pants();

        pants.name = "Gold Coll";
        pants.color = "Green";
        pants.gender = "Women";
        pants.size = "40x";
        pants.available = true;

        await this.dataSource.transaction( async (manager) => {
            await manager.save(pants);
        })
    }
}