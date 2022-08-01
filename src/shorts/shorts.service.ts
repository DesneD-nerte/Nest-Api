import { Injectable } from "@nestjs/common";
import { ParamsService } from "src/params/params.service";
import { DataSource } from "typeorm";
import { Shorts } from "./shorts.entity";

@Injectable()
export class ShortsService {
    constructor(private dataSource: DataSource, private paramsService: ParamsService) {}

    async getAll(sort: string = undefined, range: string = undefined, filter: string = undefined, limit: number = undefined) {
        return await this.paramsService.GetList(Shorts, sort, range, filter, limit);
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