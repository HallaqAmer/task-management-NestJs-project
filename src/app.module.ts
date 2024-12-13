import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from './datasource/typeorm.module';
@Module({
  imports: [
    UserModule,
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule,
    BoardModule,
    TaskModule],
  controllers: [AppController],

})
export class AppModule {}
