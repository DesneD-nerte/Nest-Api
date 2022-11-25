import { ICreatePromo } from "@interfaces/ICreatePromo";

export default class CreateShortsPromoDto implements ICreatePromo {
  entity = "ShortsPromo";

  name: string;
  description: string;
  shortsId: number;
}
