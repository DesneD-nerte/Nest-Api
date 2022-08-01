import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class ParamsService {
    constructor(private dataSource: DataSource) {}
    
    async GetList<T>(Item: new (...args: any[]) => T,
        sort: string = undefined,
        range: string = undefined,
        filter: string = undefined,
        limit: number = undefined) {

        const{ stringSortArray, stringRangeArray, stringFilterArray } = this.#fixSearchParams(sort, range, filter, limit); 

        const whereBuilderString = this.#buildDbWhereString(stringFilterArray).join('');

        return await this.dataSource.getRepository(Item).createQueryBuilder('item')
            .innerJoinAndSelect('item.photos', `itemPhoto`)
            .where(whereBuilderString)
            .orderBy(`item.${stringSortArray[0]}`, stringSortArray[1] as ("DESC" | "ASC"))
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

            let returnResult = `item.${propertyName} = '${oneObject[propertyName]}'`;

            if(propertyName === "name") {
                returnResult += ` OR item.description = '${oneObject[propertyName]}'`;
            }
            if(index !== objectFilterArray.length - 1) {
                returnResult += " AND ";
            }

            return returnResult;
        });
        
        return whereBuilderArrayString;
    }
}