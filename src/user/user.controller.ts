import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('api/users')
export class UserController {

    constructor(private readonly userService:UserService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {

        return this.userService.getAllUsers();

    }

    @Get(':userid')
    async getUserById(@Param('userid',ParseIntPipe) userid:number):Promise<User> {

        try {
            return await this.userService.getUserById(userid)

        }
        catch(err) {
            throw new NotFoundException('User does not exist!');
        }


    }

    @Get(':userid/boards')
    getUserBoards() {

    }

    @Get(':userid/tasks')
    getUserTasks() {

    }

    @Put(':userid')
    async updateUserById(@Param('userid',ParseIntPipe) userid:number, @Body() updateUserDto:UpdateUserDto ) {

        return this.userService.updateUserById(userid,updateUserDto)
    }

    @Delete(':userid')
    async deleteUserById(@Param('userid',ParseIntPipe) userid:number) {
        return this.userService.deleteUserById(userid)
        
    }

    

    @Get('auth/logout')
    logoutUser() {
        
    }

}

