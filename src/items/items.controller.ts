import { Controller, Get, Query, Res, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { GetListInterceptor } from "src/interceptors/getList.interceptor";
import { ItemsService } from "./items.service";

@Controller("items")
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get("/")
  @UseInterceptors(GetListInterceptor)
  async findBySearch(@Query("search") search: string, @Query("limit") limit: number) {
    if (!search) {
      return await this.itemsService.getAll(limit);
    } else {
      return await this.itemsService.getBySearch(search, limit);
    }
  }
}
