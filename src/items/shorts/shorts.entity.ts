import { Item } from "../item.entity";
import { Entity, OneToMany } from "typeorm";
import { ShortsPhoto } from "@root/photos/shorts-photo.entity";

@Entity()
export class Shorts extends Item {
  @OneToMany((type) => ShortsPhoto, (shortsPhoto) => shortsPhoto.shorts)
  photos: ShortsPhoto[];
}
