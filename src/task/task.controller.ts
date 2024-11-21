import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Res } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async getTaskById(@Param('id',ParseIntPipe) taskId: number, @Res() res) {
    res.status(200).json(await this.taskService.getTaskById(taskId))
    
  }

  @Patch(':id')
  async updateTaskById(
    @Res() res,
    @Param('id',ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto) {
    res.status(200).json(await this.taskService.updateTaskById(taskId, updateTaskDto))
  }

  @Delete(':id')
  async removeTaskById(@Param('id',ParseIntPipe) id: number, @Res() res) {
    res.status(200).json(await this.taskService.removeTaskById(id))
  }
}
