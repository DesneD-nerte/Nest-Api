import { Injectable } from "@nestjs/common";
import { PantsService } from "src/pants/pants.service";
import { DataSource } from "typeorm";
import { ItemsRepository } from "./items.repository";

@Injectable()
export class ItemsService {
    constructor(private dataSource: DataSource,
        private pantsService: PantsService, private itemsRepository: ItemsRepository) {}

    async getAll() {
        return await this.pantsService.getAll();
    }

    async getBySearch(search: string) {
        return await this.itemsRepository.getFromAllBySearch(search);
    }
}