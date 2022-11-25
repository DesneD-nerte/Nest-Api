import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FileModule } from "@root/file/file.module";
import { PantsPromoController } from "./pants-promo/pants-promo.controller";
import { PantsPromo } from "./pants-promo/pants-promo.entity";
import { PantsPromoService } from "./pants-promo/pants-promo.service";
import { ShortsPromoController } from "./shorts-promo/shorts-promo.controller";
import { ShortsPromo } from "./shorts-promo/shorts-promo.entity";
import { ShortsPromoService } from "./shorts-promo/shorts-promo.service";

@Module({
  imports: [FileModule, TypeOrmModule.forFeature([ShortsPromo, PantsPromo])],
  controllers: [PantsPromoController, ShortsPromoController],
  providers: [PantsPromoService, ShortsPromoService],
  exports: [PantsPromoService, ShortsPromoService],
})
export class PromoModule {}
