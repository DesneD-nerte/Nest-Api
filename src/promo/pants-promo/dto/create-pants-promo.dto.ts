import { ICreatePromo } from "@interfaces/ICreatePromo";

export default class CreatePantsPromoDto implements ICreatePromo {
  entity: string;

  name: string;
  description: string;
  pantsId: number;
}
