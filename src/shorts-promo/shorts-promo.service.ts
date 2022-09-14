import { Injectable } from "@nestjs/common";
import { FileService } from "src/file/file.service";
import { Pants } from "src/pants/pants.entity";
import { PromoService } from "src/promo/promo.service";
import { DataSource } from "typeorm";
import CreateShortsPromoDto from "./dto/create-shorts-promo.dto";
import CreatePantsPromoDto from "./dto/create-shorts-promo.dto";
import { ShortsPromo } from "./shorts-promo.entity";

@Injectable()
export class ShortsPromoService extends PromoService<ShortsPromo> {
  async getAllShortsPromo() {
    return await this.getAllPromo(ShortsPromo);
  }

  async addNewShortsPromo(
    createShortsPromoDto: CreateShortsPromoDto,
    file: Express.Multer.File
  ) {
    createShortsPromoDto.entity = "ShortsPromo";
    return await this.addCreatePromoDto(
      ShortsPromo,
      createShortsPromoDto,
      file
    );
  }
}
