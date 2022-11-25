import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "@items/item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
})
export class PhotosModule {}
