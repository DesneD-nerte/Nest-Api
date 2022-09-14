import { Item } from "../items/item.entity";
import { Entity, OneToMany } from "typeorm";
import { ShortsPhoto } from "../photos/shorts-photo.entity";

@Entity()
export class Shorts extends Item {
  photos: ShortsPhoto[];
}
