import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { GetListInterceptor } from "@interceptors/getList.interceptor";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(GetListInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }
}
