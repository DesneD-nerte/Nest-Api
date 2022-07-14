import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PantsModule } from "src/pants/pants.module";
import { ShortsModule } from "src/shorts/shorts.module";
import { Item } from "./item.entity";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";

@Module({
    imports: [TypeOrmModule.forFeature([Item]), PantsModule, ShortsModule],
    controllers: [ItemsController],
    providers: [ItemsService],
    // exports: [ItemsService]
})
export class ItemsModule {}