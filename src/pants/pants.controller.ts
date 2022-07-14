import { Body, Controller, Get, Param, Post, Res, StreamableFile } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Pants } from "./pants.entity";
import { PantsService } from "./pants.service";
import * as fs from "fs";
import { join } from "path";

@Controller('items/pants')
export class PantsController {
    constructor(private pantsService: PantsService) {}
    
    @Get()
    findAll() {
        return this.pantsService.getAll();
    }

    @Get(':id/image')
    findOneImages(@Param('id') id: number) {
        console.log(id);
        return this.pantsService.getOneImages(id);
    }

    @Get(':id/image/:imageId')
    findOneImage(@Param('id') id: number, @Param('imageId') imageId: number, @Res() res) {

        res.sendFile(join(process.cwd(), `src/pants/images/${id}/image/${imageId}.jpg`));
    }

    @Post()
    async createNew(@Body() newPants: Pants) {
        await this.pantsService.createNew(newPants);
    }
}