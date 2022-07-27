import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { PantsPromoController } from './pants-promo.controller';
import { PantsPromo } from './pants-promo.entity';
import { PantsPromoService } from './pants-promo.service';

@Module({
  imports: [TypeOrmModule.forFeature([PantsPromo])],
  controllers: [PantsPromoController],
  providers: [PantsPromoService, FileService]
})
export class PantsPromoModule {}
