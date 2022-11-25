import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PantsModule } from "src/items/pants/pants.module";
import { ShortsModule } from "src/items/shorts/shorts.module";
import { Item } from "./item.entity";
import { ItemsController } from "./items.controller";
import { ItemsRepository } from "./items.repository";
import { ItemsService } from "./items.service";

@Module({
  imports: [TypeOrmModule.forFeature([Item]), PantsModule, ShortsModule],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
  exports: [ItemsService],
})
export class ItemsModule {}
