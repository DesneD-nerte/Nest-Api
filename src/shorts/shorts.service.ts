import { Injectable } from "@nestjs/common";
import { ParamsService } from "src/params/params.service";
import { DataSource } from "typeorm";
import { Shorts } from "./shorts.entity";
import { IGetParams } from "src/interfaces/IGetParams";

@Injectable()
export class ShortsService {
  constructor(
    private dataSource: DataSource,
    private paramsService: ParamsService
  ) {}

  async getAll(params: IGetParams) {
    return await this.paramsService.GetList(
      Shorts,
      params.sort,
      params.range,
      params.filter,
      params.limit
    );
  }

  async createNew() {
    const pants = new Shorts();

    pants.name = "Gold Coll";
    pants.color = "Green";
    pants.gender = "Women";
    pants.size = 40;
    pants.available = true;

    await this.dataSource.transaction(async (manager) => {
      await manager.save(pants);
    });
  }
}
