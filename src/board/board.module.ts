import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task, User]), UserModule],
  controllers: [BoardController],
  providers: [BoardService, TaskService],
  exports: [BoardService],
})
export class BoardModule {}
