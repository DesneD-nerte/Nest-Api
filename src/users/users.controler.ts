import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import CreateUserDto from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/')
    async getUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return this.getUser(id);
    }

    @Post()
    async createUsers(@Body() createUsersDto: CreateUserDto[]) {
        await this.usersService.createMany(createUsersDto);
    }
}