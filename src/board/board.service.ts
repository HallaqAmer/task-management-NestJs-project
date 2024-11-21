import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly boardRepository: Repository<Board>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly taskService:TaskService,
  ){}

  async getBoardById(id: number) {
    return await this.boardRepository.findOneBy({id})
  }

  async getUserBoards(userId: number): Promise<Board[]> {
    return await this.boardRepository.find({where:{user:{id:userId}},
    relations:['user']})
  }

  async createNewBoard(userid: number,createBoardDto: CreateBoardDto):Promise<Board> {
    const user = await this.userRepository.findOne({where: {id:userid}});
    const board =  this.boardRepository.create({...createBoardDto,user });
    return await this.boardRepository.save(board);
  }

  async getBoardTasks(boardid:number):Promise<Task[]> {

    return await this.taskRepository.find({
      where: {board:{id:boardid}},
      relations:['board']
    })
  }

  async createBoardTask(createUserDto:CreateTaskDto,boardId:number,userId:number):Promise<Task> {

    const board= await this.getBoardById(boardId)
    const user = await this.userRepository.findOne({where: {id:userId}});
    const newTask= await this.taskService.createNewTask(createUserDto,board,user);
    return newTask

  }

}
