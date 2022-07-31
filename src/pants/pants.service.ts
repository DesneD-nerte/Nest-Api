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

    async getAll(sort: string = undefined, range: string = undefined, filter: string = undefined, limit: number = undefined) {

        const{ stringSortArray, stringRangeArray, stringFilterArray } = this.#fixSearchParams(sort, range, filter, limit); 

        const whereBuilderString = this.#buildDbWhereString(stringFilterArray).join('');

        return await this.dataSource.getRepository(Pants).createQueryBuilder("pants")
            .innerJoinAndSelect('pants.photos', 'pantsPhoto')
            .where(whereBuilderString)
            .orderBy(`pants.${stringSortArray[0]}`, stringSortArray[1] as ("DESC" | "ASC"))
            .skip(Number.parseInt(stringRangeArray[0]))
            .take(Number.parseInt(stringRangeArray[1]))
            .limit(limit)
            .getMany();
    }

    #fixSearchParams(sort: string, range: string, filter: string, limit: number) {
        sort = sort?.substring(1, sort.length - 1).replace(/[ '"]+/g, '');
        range = range?.substring(1, range.length - 1).replace(/[ ]+/g, '');
        filter = filter?.substring(1, filter.length - 1);
        
        let stringFilterArray = filter?.split(',');
        let stringSortArray = sort?.split(',');
        let stringRangeArray = range?.split(',');

        if(!stringSortArray) {
            stringSortArray = ['id', 'ASC'];
        }
        if(!stringRangeArray) {
            stringRangeArray = ['0', '24'];
        }

        return {stringSortArray, stringRangeArray, stringFilterArray}
    }

    #buildDbWhereString(stringFilterArray: string[]) {
        const objectFilterArray = [];

        if(stringFilterArray) {
            for (const oneStringFilter of stringFilterArray) {
                objectFilterArray.push(JSON.parse(oneStringFilter));
            }
        }

        const whereBuilderArrayString = objectFilterArray.map((oneObject, index) => {
            const propertyName = Object.keys(oneObject)[0];

            let returnResult = `pants.${propertyName} = '${oneObject[propertyName]}'`;

            if(propertyName === "name") {
                returnResult += ` OR pants.description = '${oneObject[propertyName]}'`;
            }
            if(index !== objectFilterArray.length - 1) {
                returnResult += " AND ";
            }

            return returnResult;
        });
        
        return whereBuilderArrayString;
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
        const imagePath = this.fileService.createFile(file, "pants");
        const photoPants = new PantsPhoto();
        photoPants.name = file.originalname;
        photoPants.url = imagePath;

        await this.dataSource.transaction( async (manager) => {
            photoPants.pants = await manager.getRepository(Pants).save(createPantsDto);
            await manager.save(photoPants);
        })
    }
}