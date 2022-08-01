import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/file/file.service';
import { ShortsPromoController } from './shorts-promo.controller';
import { ShortsPromo } from './shorts-promo.entity';
import { ShortsPromoService } from './shorts-promo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShortsPromo])],
  controllers: [ShortsPromoController],
  providers: [ShortsPromoService, FileService]
})
export class ShortsPromoModule {}
