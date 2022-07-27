import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import CreatePantsPromoDto from "./dto/create-pants-promo.dto";

@Entity()
export class PantsPromo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @Column()
    imageUrl: string

    constructor(createPantsPromoDto?: CreatePantsPromoDto) {
        if(createPantsPromoDto) {
            this.name = createPantsPromoDto.name;
            this.description = createPantsPromoDto.description;
            this.url = createPantsPromoDto.url;
        }
    }
}