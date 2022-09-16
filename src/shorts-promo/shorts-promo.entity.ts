import { Shorts } from "../shorts/shorts.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import CreateShortsPromoDto from "./dto/create-shorts-promo.dto";

@Entity()
export class ShortsPromo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @OneToOne(() => Shorts)
  @JoinColumn({ name: "shortsId" })
  shorts: Shorts;

  @Column({ nullable: false })
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
