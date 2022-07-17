import { Controller, Get, Query } from "@nestjs/common";
import { ItemsService } from "./items.service";

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

    // @Get()
    // async findAll() {
    //     return await this.itemsService.getAll();
    // }

    @Get()
    async findBySearch(@Query('search') search: string) {
        if(!search) {
            return await this.itemsService.getAll();
        }
        return await this.itemsService.getBySearch(search);
    }
}