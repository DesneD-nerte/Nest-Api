import { Controller, Get, Post } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Pants } from "./pants.entity";
import { PantsService } from "./pants.service";

@Controller('items/pants')
export class PantsController {
    constructor(private pantsService: PantsService) {}
    
    @Get()
    findAll() {
        return this.pantsService.getAll();
    }

    @Post()
    async createNew() {
        await this.pantsService.createNew();
    }
}