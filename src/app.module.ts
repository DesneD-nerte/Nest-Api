import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';


@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		CatsModule,
		UsersModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: '1234',
			database: 'postgres',
			entities: [User],
			
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
