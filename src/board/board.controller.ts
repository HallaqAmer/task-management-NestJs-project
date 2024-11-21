import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe, UseGuards, Res } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('')
  async getUserBoards(@Req() req, @Res() res) {
    const userId=req.user.sub;
    res.status(200).json(await this.boardService.getUserBoards(userId)) ;
  }

  @Post('')
  async createNewBoard(
    @Req() req,
    @Res() res,
    @Body() createBoardDto: CreateBoardDto) {
        const userId=req.user.sub;
        res.status(201).json(await this.boardService.createNewBoard(userId,createBoardDto)) ;
    }

  @Get(':id')
  async getBoardById(
    @Param('id',ParseIntPipe) boardId: number,
    @Res() res
    ) {
    res.status(200).json(await this.boardService.getBoardById(boardId))
  }

  @Get(':id/tasks')
  async getBoardTasks(@Param('id',ParseIntPipe) boardId: number, @Res() res) {
    res.status(200).json(await this.boardService.getBoardTasks(boardId))
  }

  @Post(':id/tasks')
  async createBoardTask(
    @Req() req,
    @Res() res,
    @Param('id',ParseIntPipe) boardId: number, 
    @Body() createTaskDto:CreateTaskDto) {
      const userId=req.user.sub;
      res.status(200).json(await this.boardService.createBoardTask(createTaskDto,boardId,userId))
    }
}