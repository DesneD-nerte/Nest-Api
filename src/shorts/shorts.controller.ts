import { Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { GetListInterceptor } from "src/interceptors/getList.interceptor";
import { DataSource } from "typeorm";
import { Shorts } from "./shorts.entity";
import { ShortsService } from "./shorts.service";

@Controller('items/shorts')
export class ShortsController {
    constructor(private shortsService: ShortsService) {}
    
    @Get()
    @UseInterceptors(GetListInterceptor)
    findAll(@Query('sort') sort: string,
        @Query('range') range: string, 
        @Query('filter') filter: string,
        @Query('limit') limit: number) {
            
        return this.shortsService.getAll({sort, range, filter, limit});
    }

    @Post()
    async createNew() {
        await this.shortsService.createNew();
    }
}