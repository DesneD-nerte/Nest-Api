import { Shorts } from "../shorts/shorts.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import CreateShortsPromoDto from "./dto/create-shorts-promo.dto";

@Entity()
export class ShortsPromo {
  id: number;

  name: string;

  description: string;

  imageUrl: string;

  shorts: Shorts;

  shortsId: number;

  constructor(createShortsPromoDto?: CreateShortsPromoDto) {
    if (createShortsPromoDto) {
      this.name = createShortsPromoDto.name;
      this.description = createShortsPromoDto.description;
    }
  }

  setId(id: number) {
    this.shortsId = id;
  }
}
