import { Item } from "../items/item.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pants extends Item {}