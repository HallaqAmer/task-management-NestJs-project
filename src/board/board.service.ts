import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(Board)
    private readonly boardRepository: Repository<Board>){

    }
  create(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
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
