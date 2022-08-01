import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { Pants } from 'src/pants/pants.entity';
import { DataSource } from 'typeorm';
import CreatePantsPromoDto from './dto/create-shorts-promo.dto';
import { ShortsPromo } from './shorts-promo.entity';

@Injectable()
export class ShortsPromoService {
    constructor(private dataSource: DataSource, private fileService: FileService) {}

    async getAllPantsPromo() {
        return await this.dataSource.manager.find(ShortsPromo);
    }

    async addNewPantsPromo(createPantsPromoDto: CreatePantsPromoDto, file: Express.Multer.File) {
        const imagePath = this.fileService.createFile(file, "PantsPromo");
        const pantsPromo = new ShortsPromo(createPantsPromoDto);
        pantsPromo.imageUrl = imagePath;
        pantsPromo.pantsId = createPantsPromoDto.pantsId;

        await this.dataSource.transaction( async (manager) => {
            await manager.save(pantsPromo);
        })
    }
}
