import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "../items/item.entity";
import { ShortsPhoto } from "src/photos/shorts-photo.entity";
import { ShortsController } from "./shorts.controller";
import { Shorts } from "./shorts.entity";
import { ShortsService } from "./shorts.service";

@Module({
    imports: [TypeOrmModule.forFeature([Item, Shorts, ShortsPhoto])],
    providers: [ShortsService],
    controllers: [ShortsController],
    exports: [ShortsService]
})
export class ShortsModule {}