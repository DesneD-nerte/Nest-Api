import { Pants } from "../../items/pants/pants.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
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
  imageUrl: string;

  @OneToOne(() => Pants)
  @JoinColumn({ name: "pantsId" })
  pants: Pants;

  @Column({ nullable: false })
  pantsId: number;

  constructor(createPantsPromoDto?: CreatePantsPromoDto) {
    if (createPantsPromoDto) {
      this.name = createPantsPromoDto.name;
      this.description = createPantsPromoDto.description;
    }
  }

  setId(id: number) {
    this.pantsId = id;
  }
}
