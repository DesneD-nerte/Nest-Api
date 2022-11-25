import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "../item.entity";

import { ShortsPhoto } from "@root/photos/shorts-photo.entity";
import { ShortsController } from "./shorts.controller";
import { Shorts } from "./shorts.entity";
import { ShortsService } from "./shorts.service";
import { ParamsModule } from "@root/params/params.module";

@Module({
  imports: [ParamsModule, TypeOrmModule.forFeature([Item, Shorts, ShortsPhoto])],
  providers: [ShortsService],
  controllers: [ShortsController],
  exports: [ShortsService],
})
export class ShortsModule {}
