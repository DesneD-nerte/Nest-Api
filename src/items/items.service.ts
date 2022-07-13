import { Injectable } from "@nestjs/common";
import { PantsService } from "src/pants/pants.service";
import { DataSource } from "typeorm";

@Injectable()
export class ItemsService {
    constructor(private pantsService: PantsService) {}

    async getAll() {
        return await this.pantsService.getAll();
    }
}