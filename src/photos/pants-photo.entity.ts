import { Pants } from "../items/pants/pants.entity";
import { Entity, ManyToOne } from "typeorm";
import { Photo } from "./photo.entity";

@Entity()
export class PantsPhoto extends Photo {
  @ManyToOne((type) => Pants, (pants) => pants.photos)
  pants: Pants;
}
