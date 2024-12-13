import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getBoardById(boardId: number) {
    return await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['collaborators'],
    });
  }

  async getUserBoards(user: User): Promise<Board[]> {
    return await this.boardRepository.find({
      where: { user },
      relations: ['user'],
    });
  }

  async createNewBoard(
    user: User,
    createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    const board = this.boardRepository.create({ ...createBoardDto, user });
    return await this.boardRepository.save(board);
  }

  async getBoardTasks(boardId: number): Promise<Task[]> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['tasks'],
    });
    return board.tasks;
  }
  async addCollaboratorToBoard(boardId: number, user: User): Promise<void> {
    const board = await this.getBoardById(boardId);
    board.collaborators.push(user);
    await this.boardRepository.save(board);
  }
}
