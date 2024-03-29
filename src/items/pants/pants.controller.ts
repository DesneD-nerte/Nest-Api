import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { PantsService } from "./pants.service";
import * as fs from "fs";
import { join } from "path";
import CreatePantsDto from "./dto/create-pants.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetListInterceptor } from "src/interceptors/getList.interceptor";

@Controller("items/pants")
export class PantsController {
  constructor(private pantsService: PantsService) {}

  @Get()
  @UseInterceptors(GetListInterceptor)
  findAll(
    @Query("sort") sort: string,
    @Query("range") range: string,
    @Query("filter") filter: string,
    @Query("limit") limit: number
  ) {
    return this.pantsService.getAll({ sort, range, filter, limit });
  }

  @Get(":id/image")
  findOneImages(@Param("id") id: number) {
    console.log(id);
    return this.pantsService.getOneImages(id);
  }

  @Get(":id/image/:imageId")
  findOneImage(@Param("id") id: number, @Param("imageId") imageId: number, @Res() res) {
    res.sendFile(join(process.cwd(), `src/pants/images/${id}/image/${imageId}.jpg`));
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async createNew(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPantsDto: CreatePantsDto
  ) {
    await this.pantsService.createNew(createPantsDto, file);
  }
}
