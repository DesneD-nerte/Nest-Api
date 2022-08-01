import { ICreatePromo } from "src/interfaces/ICreatePromo";

export default class CreateShortsPromoDto implements ICreatePromo {
    entity: string = "ShortsPromo";

    name: string;
    description: string;
    shortsId: number
}