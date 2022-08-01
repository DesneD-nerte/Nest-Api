import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileService } from "src/file/file.service";
import { Item } from "src/items/item.entity";
import { ParamsService } from "src/params/params.service";
import { PantsPhoto } from "src/photos/pants-photo.entity";
import { PantsController } from "./pants.controller";
import { Pants } from "./pants.entity";
import { PantsService } from "./pants.service";

@Module({
    imports: [TypeOrmModule.forFeature([Item, Pants, PantsPhoto])],
    providers: [PantsService, FileService, ParamsService],
    controllers: [PantsController],
    exports: [PantsService]
})
export class PantsModule {}