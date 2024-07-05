import { Module } from '@nestjs/common';
import { UserModule} from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { BoardModule } from './board/board.module';
import { Board } from './board/entities/board.entity';



@Module({

  imports: [
    UserModule,
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.DB_HOST,
    port:+process.env.DB_PORT,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:[User,Board],
    synchronize:false,
  }),
    BoardModule],

})
export class AppModule {}
