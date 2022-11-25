import { Injectable } from "@nestjs/common";
import { FileService } from "src/file/file.service";
import { Pants } from "src/items/pants/pants.entity";
import { PromoService } from "src/promo/promo.service";
import { DataSource } from "typeorm";
import CreatePantsPromoDto from "./dto/create-pants-promo.dto";
import { PantsPromo } from "./pants-promo.entity";

@Injectable()
export class PantsPromoService extends PromoService<PantsPromo> {
  async getAllPantsPromo() {
    return await this.getAllPromo(PantsPromo);
  }

  async addNewPantsPromo(createPantsPromoDto: CreatePantsPromoDto, file: Express.Multer.File) {
    createPantsPromoDto.entity = "PantsPromo";
    return await this.addCreatePromoDto(PantsPromo, createPantsPromoDto, file);
  }
}
