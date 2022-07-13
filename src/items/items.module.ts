import { Module } from "@nestjs/common";
import { PantsModule } from "src/pants/pants.module";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";

@Module({
    imports: [PantsModule],
    controllers: [ItemsController],
    providers: [ItemsService],
    // exports: [ItemsService]
})
export class ItemsModule {}