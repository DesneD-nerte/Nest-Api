import { Controller, Get, Post } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Shorts } from "./shorts.entity";
import { ShortsService } from "./shorts.service";

@Controller('items/pants')
export class ShortsController {
    constructor(private shortsService: ShortsService) {}
    
    @Get()
    findAll() {
        return this.shortsService.getAll();
    }

    @Post()
    async createNew() {
        await this.shortsService.createNew();
    }
}