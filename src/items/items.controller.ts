import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from 'express';
import { ItemsService } from "./items.service";

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

    @Get()
    async findBySearch(@Query('search') search: string, @Res() res: Response) {
        if(!search) {
            const result = await this.itemsService.getAll();
            res.setHeader("Content-Range", result.length);
            res.json(result);
        }
        return await this.itemsService.getBySearch(search);
    }
}