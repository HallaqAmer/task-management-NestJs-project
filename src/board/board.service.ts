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
import { UserService } from 'src/user/user.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly boardRepository: Repository<Board>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly taskService:TaskService,
    @Inject(forwardRef(() => UserService)) private readonly userService:UserService
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

  async createBoardTask(_createUserDto:CreateTaskDto,id:number):Promise<Task> {

    const board= await this.getBoardById(id)
    const user=await this.userService.getUserById(3)
    // const user=req.user;
    const newTask= await this.taskService.createNewTask(_createUserDto,board,user);
    return newTask

  }

}
