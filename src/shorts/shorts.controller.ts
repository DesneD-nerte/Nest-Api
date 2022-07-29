import { Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { GetListInterceptor } from "src/interceptors/getList.interceptor";
import { DataSource } from "typeorm";
import { Shorts } from "./shorts.entity";
import { ShortsService } from "./shorts.service";

@Controller('items/shorts')
export class ShortsController {
    constructor(private shortsService: ShortsService) {}
    
    @Get()
    @UseInterceptors(GetListInterceptor)
    findAll() {
        return this.shortsService.getAll();
    }

    @Post()
    async createNew() {
        await this.shortsService.createNew();
    }
}