import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "src/items/item.entity";
import { PantsPhoto } from "src/photos/pants-photo.entity";
import { PantsController } from "./pants.controller";
import { Pants } from "./pants.entity";
import { PantsService } from "./pants.service";

@Module({
    imports: [TypeOrmModule.forFeature([Item, Pants, PantsPhoto])],
    providers: [PantsService],
    controllers: [PantsController],
    exports: [PantsService]
})
export class PantsModule {}