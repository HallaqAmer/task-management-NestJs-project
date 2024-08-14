import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/users')
export class UserController {

    constructor(private readonly userService:UserService) {}

    @Get()
    async getAllUsers(@Req() req,@Res() res): Promise<void> {

        res.status(200).json(await this.userService.getAllUsers()) ;

    }

    @UseGuards(AuthGuard)
    @Get(':userid')
    async getUserById(@Param('userid',ParseIntPipe) userid:number,@Req() req,@Res() res){
        console.log(req.headers.authorization)
        try {
            res.status(200).json(await this.userService.getUserById(userid)) 

        }
        catch(err) {
            throw new NotFoundException('User does not exist!');
        }


    }

    @UseGuards(AuthGuard)
    @Get(':userid/boards')
    async getUserBoards(@Param('userid',ParseIntPipe) userid:number,@Req() req,@Res() res) {

        res.status(200).json(await this.userService.getUserBoards(userid))

    }

    @UseGuards(AuthGuard)
    @Post(':userid/boards')
    async create(
        @Param('userid',ParseIntPipe) userid:number,
        @Body() createBoardDto: CreateBoardDto) {
    
    return await this.userService.createNewBoard(userid,createBoardDto);
  }

    @Get(':userid/tasks')
    async getUserTasks(@Param('userid',ParseIntPipe) userid:number,@Req() req,@Res() res) {

        res.status(200).json(await this.userService.getUserTasks(userid))

    }

    @Put(':userid')
    async updateUserById(@Param('userid',ParseIntPipe) userid:number, @Body() updateUserDto:UpdateUserDto ) {

        return await this.userService.updateUserById(userid,updateUserDto)
    }

    @Delete(':userid')
    async deleteUserById(@Param('userid',ParseIntPipe) userid:number) {
        return await this.userService.deleteUserById(userid)
        
    }

    

    @Get('auth/logout')
    logoutUser() {
        
    }

}

