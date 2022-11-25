import { Item } from "../item.entity";
import { Entity, OneToMany } from "typeorm";
import { PantsPhoto } from "../../photos/pants-photo.entity";

@Entity()
export class Pants extends Item {
  @OneToMany((type) => PantsPhoto, (pantsPhoto) => pantsPhoto.pants)
  photos: PantsPhoto[];
}
