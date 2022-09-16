import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

const corsOptions: CorsOptions = {
  exposedHeaders: ["Content-Range"],
  origin: ["http://localhost:3000", "http://localhost:3001"],
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
