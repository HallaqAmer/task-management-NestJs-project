import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Board,Task])],
  controllers: [BoardController],
  providers: [BoardService],
  exports:[BoardService]
})
export class BoardModule {}
