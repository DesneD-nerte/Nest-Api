import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { DataSource } from 'typeorm';
import CreatePantsPromoDto from './dto/create-pants-promo.dto';
import { PantsPromo } from './pants-promo.entity';

@Injectable()
export class PantsPromoService {
    constructor(private dataSource: DataSource, private fileService: FileService) {}

    async getAllPantsPromo() {
        return await this.dataSource.manager.find(PantsPromo);
    }

    async addNewPantsPromo(createPantsPromoDto: CreatePantsPromoDto, file: Express.Multer.File) {
        const imagePath = this.fileService.createFile(file, "PantsPromo");
        const pantsPromo = new PantsPromo(createPantsPromoDto);
        pantsPromo.imageUrl = imagePath;

        await this.dataSource.transaction( async (manager) => {
            await manager.save(pantsPromo);
        })
    }
}
