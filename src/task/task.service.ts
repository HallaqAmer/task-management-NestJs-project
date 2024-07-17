import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Board } from 'src/board/entities/board.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {

  constructor(@InjectRepository(Task) private readonly taskRepository:Repository<Task>) {}

  async createNewTask(createTaskDto: CreateTaskDto,board:Board,user:User): Promise<Task> {
    const newTask=  this.taskRepository.create({...createTaskDto,board,user})
    return await this.taskRepository.save(newTask);
  }

  

  getTaskById(id: number) {
    return this.taskRepository.findOneBy({id});
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({where:{user:{id:userId}},
    relations:['user']})
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async removeTaskById(id: number) {
    return await this.taskRepository.delete({id})
  }
}
