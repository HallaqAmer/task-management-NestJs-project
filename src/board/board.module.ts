import { forwardRef, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Task } from 'src/task/entities/task.entity';
import { TaskModule } from 'src/task/task.module';
import { TaskService } from 'src/task/task.service';
import { User } from 'src/user/entities/user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Board,Task,User])],
  controllers: [BoardController],
  providers: [BoardService,TaskService],
  exports:[BoardService]
})
export class BoardModule {}
