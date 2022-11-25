import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "src/items/item.entity";
import { ParamsService } from "./params.service";

@Module({
  providers: [ParamsService],
  exports: [ParamsService],
})
export class ParamsModule {}
