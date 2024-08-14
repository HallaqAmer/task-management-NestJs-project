import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";

@Module({
    imports:[
        UserModule,
        ConfigModule,
        JwtModule.register({
            global:true,
            secret:jwtConstants.secret,
            signOptions:{ expiresIn:'1h'}
        })
    ],
    controllers:[AuthController],
    providers:[
        AuthService,
    ],
    exports:[AuthService]
})
export class AuthModule {}