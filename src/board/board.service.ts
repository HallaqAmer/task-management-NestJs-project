import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly boardRepository: Repository<Board>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ){}

  async getBoardById(id: number) {
    return await this.boardRepository.findOneBy({id})
  }

  async getBoardsByUserId(userId: number): Promise<Board[]> {
    return await this.boardRepository.find({where:{user:{id:userId}},
    relations:['user']})
  }

  async getBoardTasks(id:number):Promise<Task[]> {

    return await this.taskRepository.find({
      where: {board:{id:id}},
      relations:['board']
    })
  }

}
