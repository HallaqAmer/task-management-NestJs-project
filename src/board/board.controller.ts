import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  ParseIntPipe,
  UseGuards,
  Res,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { TaskService } from 'src/task/task.service';
import { Board } from './entities/board.entity';
import { Task } from 'src/task/entities/task.entity';

@Controller('api/boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  @Get('')
  async getUserBoards(@Req() req, @Res() res) {
    const userId: number = req.user.sub;
    const user: User = await this.userService.getUserById(userId);
    res.status(200).json(await this.boardService.getUserBoards(user));
  }

  @Post('')
  async createNewBoard(
    @Req() req,
    @Res() res,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    const userId: number = req.user.sub;
    const user: User = await this.userService.getUserById(userId);
    res
      .status(201)
      .json(await this.boardService.createNewBoard(user, createBoardDto));
  }

  @Get(':id')
  async getBoardById(@Param('id', ParseIntPipe) boardId: number, @Res() res) {
    res.status(200).json(await this.boardService.getBoardById(boardId));
  }

  @Get(':id/tasks')
  async getBoardTasks(@Param('id', ParseIntPipe) boardId: number, @Res() res) {
    try {
      res.status(200).json(await this.boardService.getBoardTasks(boardId));
    } catch (error) {
      res.status(400).json(error);
    }
  }

  @Post(':id/tasks')
  async createBoardTask(
    @Req() req,
    @Res() res,
    @Param('id', ParseIntPipe) boardId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const userId: number = req.user.sub;
    const user: User = await this.userService.getUserById(userId);
    const board: Board = await this.boardService.getBoardById(boardId);
    const newTask: Task = await this.taskService.createNewTask(
      createTaskDto,
      board,
      user,
    );
    res.status(200).json(newTask);
  }

  @Post(':boardid/collaborators')
  async addCollaboratorToBoard(
    @Res() res,
    @Req() req,
    @Param('boardid', ParseIntPipe) boardId: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    try {
      const user = await this.userService.getUserById(userId);
      await this.boardService.addCollaboratorToBoard(boardId, user);
      res.status(201).json({ message: 'Collaborator added' });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
