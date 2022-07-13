import { Body, Controller, Get, Header, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Redirect, Req } from "@nestjs/common";
import { Request } from "express";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./interfaces/cat.interface";

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get()
    async findAll(): Promise<Cat[]> {
        //throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
        return this.catsService.findAll();
    } 

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.catsService.findOne(id);
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto ) {
        return this.catsService.create(createCatDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createCatDto: CreateCatDto) {
        return `This action updates a ${id} cat with ${createCatDto.name}`; 
    }

    // @Post()
    // @Header('Cache-Control', 'none')
    // create(): string {
    //     return 'This actions adds a new cat';
    // }

    // @Get()
    // @Redirect('https://nestjs.com', 302)
    // getDocs(@Query('version') version){
    //     if(version && version === '5') {
    //         return { url: 'https://docs.nestjs.com/v5/' }
    //     }
    // }

    // @Get(':id')
    // findOne(@Param() params): string {
    //     console.log(params.id);
    //     return `This action returns a ${params.id} cat`;
    // }

    // findAll(@Req() request: Request): string {
    //     return 'This action returns all cats';
    // }
}