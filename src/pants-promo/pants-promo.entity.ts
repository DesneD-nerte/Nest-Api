import { Pants } from "../pants/pants.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import CreatePantsPromoDto from "./dto/create-pants-promo.dto";

@Entity()
export class PantsPromo {
  id: number;

  name: string;

  description: string;

  imageUrl: string;

  pants: Pants;

  pantsId: number;

  constructor(createPantsPromoDto?: CreatePantsPromoDto) {
    if (createPantsPromoDto) {
      this.name = createPantsPromoDto.name;
      this.description = createPantsPromoDto.description;
    }
  }

  setId(id: number) {
    this.pantsId = id;
  }
}
