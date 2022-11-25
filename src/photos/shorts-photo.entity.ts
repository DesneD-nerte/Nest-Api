import { Shorts } from "@items/shorts/shorts.entity";
import { Entity, ManyToOne } from "typeorm";
import { Photo } from "./photo.entity";

@Entity()
export class ShortsPhoto extends Photo {
  @ManyToOne((type) => Shorts, (shorts) => shorts.photos)
  shorts: Shorts;
}
