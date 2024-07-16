import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Board } from 'src/board/entities/board.entity';
import { BoardModule } from 'src/board/board.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,Board]),BoardModule,TaskModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
