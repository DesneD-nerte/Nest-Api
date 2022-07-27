import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from 'express';
import { ItemsService } from "./items.service";

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

    @Get('/')
    async findBySearch(@Query('search') search: string, @Query('limit') limit: number = null, @Res() res: Response) {
        if(!search) {
            const result = await this.itemsService.getAll(limit);
            res.setHeader("Content-Range", result.length);
            res.json(result);
        } else {
            const searchedItems = await this.itemsService.getBySearch(search, limit);
            res.json(searchedItems);
        }
    }
}