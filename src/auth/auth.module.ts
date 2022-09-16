import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService],
})
export class AuthModule {}
