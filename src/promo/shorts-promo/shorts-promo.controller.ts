import { Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

import { ShortsPromoService } from "./shorts-promo.service";
import CreatePantsPromoDto from "./dto/create-shorts-promo.dto";
import { GetListInterceptor } from "@interceptors/getList.interceptor";

@Controller("shorts-promo")
export class ShortsPromoController {
  constructor(private pantsPromoService: ShortsPromoService) {}

  @Get()
  @UseInterceptors(GetListInterceptor)
  async getAllPantsPromo() {
    return await this.pantsPromoService.getAllShortsPromo();
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async createNew(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPantsPromoDto: CreatePantsPromoDto
  ) {
    return await this.pantsPromoService.addNewShortsPromo(createPantsPromoDto, file);
  }
}
