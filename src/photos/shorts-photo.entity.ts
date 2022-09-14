import { Shorts } from "../shorts/shorts.entity";
import { Entity, ManyToOne } from "typeorm";
import { Photo } from "./photo.entity";

@Entity()
export class ShortsPhoto extends Photo {
  shorts: Shorts;
}
