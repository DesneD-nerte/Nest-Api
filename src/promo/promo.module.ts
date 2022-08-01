import { Module } from "@nestjs/common";
import { FileService } from "src/file/file.service";
import { PromoService } from "./promo.service";

@Module({
    // imports: [TypeOrmModule.forFeature([PantsPromo])],
    providers: [FileService, PromoService]
})
export class PromoModule {}
