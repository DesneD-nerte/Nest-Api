import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';

import * as path from 'path';
import configuration from './config/configuration';

import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { FileModule } from './file/file.module';
import { PantsPromoModule } from './pants-promo/pants-promo.module';
import { ShortsPromoModule } from './shorts-promo/shorts-promo.module';

import { User } from './users/user.entity';
import { UserPhoto } from './userPhotos/userPhoto.entity';
import { Item } from './items/item.entity';
import { Pants } from './pants/pants.entity';
import { Photo } from './photos/photo.entity';
import { PantsPromo } from './pants-promo/pants-promo.entity';
import { Shorts } from './shorts/shorts.entity';
import { ShortsPromo } from './shorts-promo/shorts-promo.entity';
import { ShortsPhoto } from './photos/shorts-photo.entity';
import { PantsPhoto } from './photos/pants-photo.entity';
import { PromoModule } from './promo/promo.module';


@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration]
		}),

		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		  }),
		
		FileModule,
		UsersModule,
		ItemsModule,
		PromoModule,//
		PantsPromoModule,
		ShortsPromoModule,

		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: '1234',
			database: 'postgres',
			entities: [User, UserPhoto, Item, Pants, Shorts, PantsPhoto, ShortsPhoto, PantsPromo, ShortsPromo],
			
			autoLoadEntities: true,
			synchronize: true,
		})
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	consumer
		.apply(LoggerMiddleware)
		// .forRoutes(CatsController)
	}
}
