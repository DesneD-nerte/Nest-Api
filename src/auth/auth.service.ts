import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string) {
    const user = await this.usersService.findOne(email);

    if (user) {
      return user;
    }

    return null;
  }
}
