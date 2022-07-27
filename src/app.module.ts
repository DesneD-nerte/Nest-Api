import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { User } from './users/user.entity';
import { UserPhoto } from './userPhotos/userPhoto.entity';
import { Item } from './items/item.entity';
import { Pants } from './pants/pants.entity';
import { ItemsModule } from './items/items.module';
import { Photo } from './photos/photo.entity';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { PantsPromoModule } from './pants-promo/pants-promo.module';


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
		CatsModule,
		UsersModule,
		ItemsModule,
		PantsPromoModule,

		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: '1234',
			database: 'postgres',
			entities: [User, UserPhoto, Item, Pants],
			
			autoLoadEntities: true,
			synchronize: true,
		})
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	consumer
		.apply(LoggerMiddleware)
		.forRoutes(CatsController)
	}
}
