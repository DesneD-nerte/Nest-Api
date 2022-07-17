import { Injectable, StreamableFile } from "@nestjs/common";
import { PantsPhoto } from "src/photos/pants-photo.entity";
import { DataSource } from "typeorm";
import { Pants } from "./pants.entity";
import { FileService } from "src/file/file.service";
import CreatePantsDto from "./dto/create-pants.dto"

@Injectable()
export class PantsService {
    constructor(private dataSource: DataSource,
        private fileService: FileService) {}

    async getAll() {
        return await this.dataSource.manager.find(Pants);
    }

    async getOneImages(id: number) {
        const pantsRepository = this.dataSource.getRepository(Pants);

        const pants = await pantsRepository.find({where: { id }, relations: ["photos"]});

        const arrayUrl = [];

        for (const onePants of pants) {
            for (const pantsPhoto of onePants.photos) {
                arrayUrl.push(pantsPhoto.url);
            }
        }

        return arrayUrl;
    }

    async createNew(createPantsDto: CreatePantsDto, file: Express.Multer.File) {
        const imagePath = this.fileService.createFile(file);
        const photoPants = new PantsPhoto();
        photoPants.name = file.originalname;
        photoPants.url = imagePath;

        await this.dataSource.transaction( async (manager) => {
            photoPants.pants = await manager.getRepository(Pants).save(createPantsDto);
            await manager.save(photoPants);
        })
    }
}