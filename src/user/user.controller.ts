import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { BoardService } from 'src/board/board.service';

@Controller('api/users')
@UseGuards(AuthGuard)
export class UserController {

    constructor(
        private readonly userService:UserService,
    ) {}

    @Get()
    async getAllUsers(@Req() req,@Res() res): Promise<void> {
        res.status(200).json(await this.userService.getAllUsers()) ;
    }

    @UseGuards(AuthGuard)
    @Get(':userid')
    async getUserById(@Param('userid',ParseIntPipe) userid:number,@Req() req,@Res() res){
        try {
            res.status(200).json(await this.userService.getUserById(userid)) 

        }
        catch(err) {
            throw new NotFoundException('User does not exist!');
        }
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
}

