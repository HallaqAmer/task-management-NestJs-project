import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(Board)
    private readonly boardRepository: Repository<Board>){

    }
    createNewBoard(createBoardDto: CreateBoardDto,user: any):Promise<Board> {
      const board = this.boardRepository.create({ ...createBoardDto, user });
      return this.boardRepository.save(board);
  }

  getBoardById(id: number) {
    return this.boardRepository.findOneBy({id})
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
