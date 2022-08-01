import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { FileService } from "src/file/file.service";
import { ICreatePromo } from "src/interfaces/ICreatePromo";
import { PantsPromo } from "src/pants-promo/pants-promo.entity";
import CreateShortsPromoDto from "src/shorts-promo/dto/create-shorts-promo.dto";
import { ShortsPromo } from "src/shorts-promo/shorts-promo.entity";
import { DataSource } from "typeorm";

@Injectable()
export class PromoService<T extends PantsPromo | ShortsPromo> {

    protected itemPromo: T;

    constructor(private dataSource: DataSource, private fileService: FileService) {}

    protected async getAllPromo<T>(itemPromoClass: new (...args: any[]) => T) {
        return await this.dataSource.manager.find<T>(itemPromoClass);
    }

    async addCreatePromoDto(itemPromoClass: new (...args: any[]) => T, createPromoDto: ICreatePromo, file: Express.Multer.File) {
        this.itemPromo = new itemPromoClass(createPromoDto);
        const imagePath = this.fileService.createFile(file, createPromoDto.entity);
        this.itemPromo.imageUrl = imagePath;

        let id = this.#getIdFromPropertyDto(createPromoDto);
        this.itemPromo.setId(id);

        return await this.dataSource.transaction( async (manager) => {
            return await manager.save(this.itemPromo);
        })
    }

    #getIdFromPropertyDto(createPromoDto: ICreatePromo) {
        for (const property in createPromoDto) {
            if(property.includes("Id") || property.includes("id")) {
                return createPromoDto[property];
            }
        }
    }
}