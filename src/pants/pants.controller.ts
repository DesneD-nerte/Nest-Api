import { Body, Controller, Get, Param, Post, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Pants } from "./pants.entity";
import { PantsService } from "./pants.service";
import * as fs from "fs";
import { join } from "path";
import CreatePantsDto from "./dto/create-pants.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetListInterceptor } from "src/interceptors/getList.interceptor";

@Controller('items/pants')
export class PantsController {
    constructor(private pantsService: PantsService) {}
    
    @Get()
    @UseInterceptors(GetListInterceptor)
    findAll(@Query('limit') limit: number = null) {
        return this.pantsService.getAll(limit);
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
    @UseInterceptors(FileInterceptor('file'))
    async createNew(@UploadedFile() file: Express.Multer.File, @Body() createPantsDto: CreatePantsDto) {
        await this.pantsService.createNew(createPantsDto, file);
    }
}