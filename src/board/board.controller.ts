import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('api/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto,@Req() req: Request) {
    console.log(req)
    const user={}
    return this.boardService.createNewBoard(createBoardDto,user);
  }

  @Get(':id')
  getUserBoards(@Param('id') id: string) {
    return this.boardService.getBoardById(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
