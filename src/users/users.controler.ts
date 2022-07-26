import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res } from "@nestjs/common";
import { Response } from "express";
import CreateUserDto from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/')
    async getUsers(@Res() res: Response) {
        const result = await this.usersService.findAll();

        res.setHeader("Content-Range", result.length);
        res.json(result);
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.findOne(id);
    }

    @Post('/')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createOne(createUserDto);
    }

    @Post('/')
    async createUsers(@Body() createUsersDto: CreateUserDto[]) {
        return await this.usersService.createMany(createUsersDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.removeOne(id);
    }
}