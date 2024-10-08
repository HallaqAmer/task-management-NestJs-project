import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

@Controller('api/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(':id')
  async getBoardById(@Param('id') id: string) {
    return await this.boardService.getBoardById(+id);
  }

  @Get(':id/tasks')
  async getBoardTasks(@Param('id',ParseIntPipe) id: number) {
    return await this.boardService.getBoardTasks(id);
  }

  @Post(':id/tasks')
  async createBoardTask(
    @Param('id',ParseIntPipe) id: number, 
    @Body() createTaskDto:CreateTaskDto) {
      
    return await this.boardService.createBoardTask(createTaskDto,id);
  }

}