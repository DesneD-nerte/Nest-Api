import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "../item.entity";
import { ShortsPhoto } from "src/photos/shorts-photo.entity";
import { ShortsController } from "./shorts.controller";
import { Shorts } from "./shorts.entity";
import { ShortsService } from "./shorts.service";
import { ParamsService } from "src/params/params.service";

@Module({
  imports: [TypeOrmModule.forFeature([Item, Shorts, ShortsPhoto])],
  providers: [ShortsService, ParamsService],
  controllers: [ShortsController],
  exports: [ShortsService],
})
export class ShortsModule {}
