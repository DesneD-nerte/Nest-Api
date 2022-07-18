import { Injectable } from "@nestjs/common";
import { Pants } from "../pants/pants.entity";
import { PantsService } from "src/pants/pants.service";
import { DataSource, Like } from "typeorm";

@Injectable()
export class ItemsService {
    constructor(private dataSource: DataSource,
        private pantsService: PantsService) {}

    async getAll() {
        return await this.pantsService.getAll();
    }

    async getBySearch(search: string) {
        const pantsRepository = this.dataSource.getRepository(Pants);
        return await pantsRepository.find({relations: {photos: true}, where: {name: Like(`${search}%`)}})
    }
}