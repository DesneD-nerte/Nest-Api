import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsModule } from "src/items/items.module";
import { PantsController } from "./pants.controller";
import { Pants } from "./pants.entity";
import { PantsService } from "./pants.service";

@Module({
    imports: [TypeOrmModule.forFeature([Pants])],
    providers: [PantsService],
    controllers: [PantsController],
    exports: [PantsService]
})
export class PantsModule {}