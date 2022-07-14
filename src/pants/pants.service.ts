import { Injectable, StreamableFile } from "@nestjs/common";
import { PantsPhoto } from "src/photos/pants-photo.entity";
import { DataSource } from "typeorm";
import { Pants } from "./pants.entity";
import * as fs from "fs";
import { join } from "path";

@Injectable()
export class PantsService {
    constructor(private dataSource: DataSource) {}

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

    // getOneImage(id: number, imageId: number): StreamableFile {
    //     const file = fs.createReadStream(join(process.cwd(), `src/pants/images/${id}/image/${imageId}.jpg`));

    //     console.log(file);

    //     return new StreamableFile(file);
    // }

    async createNew(newPants: Pants) {
        const pants = new Pants();
        const photoPants = new PantsPhoto();
        photoPants.name = "Hello";
        photoPants.createdAt = new Date();
        photoPants.url = "http://localhost:3000/items/pants/2/image/2";

        pants.name = "Gold Coll";
        pants.color = "Green";
        pants.gender = "Women";
        pants.size = "40x";
        pants.available = true;
        pants.photos = [photoPants];

        await this.dataSource.transaction( async (manager) => {
            await manager.save(photoPants);
            // await manager.save(pants);
        })
    }
}