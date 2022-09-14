import { Injectable } from "@nestjs/common";
import { Pants } from "src/pants/pants.entity";
import { Shorts } from "src/shorts/shorts.entity";
import { DataSource, Like } from "typeorm";

@Injectable()
export class ItemsRepository {
  constructor(private dataSource: DataSource) {}

  async getFromAllBySearch(search: string, limit: number) {
    const allPants = await this.dataSource.manager.find(Pants, {
      relations: { photos: true },
      where: [
        { name: Like(`%${search}%`) },
        { description: Like(`%${search}%`) },
      ],
      take: limit,
    });
    const allShort = await this.dataSource.manager.find(Shorts, {
      relations: { photos: true },
      where: [
        { name: Like(`%${search}%`) },
        { description: Like(`%${search}%`) },
      ],
      take: limit,
    });

    return [...allPants, ...allShort];
  }
}
