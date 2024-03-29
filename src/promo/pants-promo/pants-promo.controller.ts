import { Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { PantsPromoService } from "./pants-promo.service";
import CreatePantsPromoDto from "./dto/create-pants-promo.dto";
import { GetListInterceptor } from "@interceptors/getList.interceptor";

@Controller("pants-promo")
export class PantsPromoController {
  constructor(private pantsPromoService: PantsPromoService) {}

  @Get()
  @UseInterceptors(GetListInterceptor)
  async getAllPantsPromo() {
    return await this.pantsPromoService.getAllPantsPromo();
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async createNew(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPantsPromoDto: CreatePantsPromoDto
  ) {
    return await this.pantsPromoService.addNewPantsPromo(createPantsPromoDto, file);
  }
}
