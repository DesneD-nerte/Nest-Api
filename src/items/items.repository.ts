import { Injectable } from "@nestjs/common";
import { DataSource, Like } from "typeorm";

import { Pants } from "@items/pants/pants.entity";
import { Shorts } from "@items/shorts/shorts.entity";

@Injectable()
export class ItemsRepository {
  constructor(private dataSource: DataSource) {}

  async getFromAllBySearch(search: string, limit: number) {
    const allPants = await this.dataSource.manager.find(Pants, {
      relations: { photos: true },
      where: [{ name: Like(`%${search}%`) }, { description: Like(`%${search}%`) }],
      take: limit,
    });
    const allShort = await this.dataSource.manager.find(Shorts, {
      relations: { photos: true },
      where: [{ name: Like(`%${search}%`) }, { description: Like(`%${search}%`) }],
      take: limit,
    });

    return [...allPants, ...allShort];
  }
}
