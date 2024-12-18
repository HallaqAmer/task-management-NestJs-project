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
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async createNewTask(
    createTaskDto: CreateTaskDto,
    board: Board,
    user: User,
  ): Promise<Task> {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      board,
      user,
    });
    return await this.taskRepository.save(newTask);
  }

  async getTaskById(id: number) {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['user', 'board'],
    });
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async updateTaskById(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update({ id }, { ...updateTaskDto });
  }

  async removeTaskById(id: number) {
    return await this.taskRepository.delete({ id });
  }

  // async getTasksOfBoard(boardId: number): Promise<Task[]> {

  //   return await this.taskRepository.find({
  //     where: { board: { id: boardId } },
  //     relations: ['board'],
  //   });
  // }
}
