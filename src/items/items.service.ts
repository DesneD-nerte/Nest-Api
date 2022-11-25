import { Injectable } from "@nestjs/common";
import { PantsService } from "src/items/pants/pants.service";
import { ShortsService } from "src/items/shorts/shorts.service";
import { DataSource } from "typeorm";
import { ItemsRepository } from "./items.repository";

@Injectable()
export class ItemsService {
  constructor(
    private dataSource: DataSource,
    private pantsService: PantsService,
    private shortsService: ShortsService,
    private itemsRepository: ItemsRepository
  ) {}

  async getAll(limit: number) {
    const allPants = await this.pantsService.getAll({ limit });
    const allShorts = await this.shortsService.getAll({ limit });

    return [...allPants, ...allShorts];
  }

  async getBySearch(search: string, limit: number) {
    return await this.itemsRepository.getFromAllBySearch(search, limit);
  }
}
