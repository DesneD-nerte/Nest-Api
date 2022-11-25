import { Item } from "../item.entity";
import { Entity, OneToMany } from "typeorm";
import { PantsPhoto } from "@root/photos/pants-photo.entity";

@Entity()
export class Pants extends Item {
  @OneToMany((type) => PantsPhoto, (pantsPhoto) => pantsPhoto.pants)
  photos: PantsPhoto[];
}
