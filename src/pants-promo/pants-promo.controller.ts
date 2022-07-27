import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PantsPromoService } from './pants-promo.service';
import { FileInterceptor } from "@nestjs/platform-express";
import CreatePantsPromoDto from './dto/create-pants-promo.dto';

@Controller('pants-promo')
export class PantsPromoController {
    constructor(private pantsPromoService: PantsPromoService) {}

    @Get()
    async getAllPantsPromo() {
        return await this.pantsPromoService.getAllPantsPromo();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createNew(@UploadedFile() file: Express.Multer.File, @Body() createPantsPromoDto: CreatePantsPromoDto) {
        return await this.pantsPromoService.addNewPantsPromo(createPantsPromoDto, file);
    }
}
