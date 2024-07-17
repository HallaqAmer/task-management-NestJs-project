import { forwardRef, Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';
import { Board } from 'src/board/entities/board.entity';
import { BoardService } from 'src/board/board.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Board) private readonly boardRepository: Repository<Board>,
        @Inject(forwardRef(() => BoardService)) private readonly boardService:BoardService,
        private readonly taskService:TaskService

    ){}
    

    async getAllUsers() :Promise<User[]> {
        return await this.userRepository.find()
    }

    async getUserById(id:number): Promise<User> {
        return await this.userRepository.findOneBy({ id });
      }

    async findUserByEmail(email:string): Promise<User | undefined> {

        return await this.userRepository.findOne({where: {email}})
    }

    async createNewUser(_createUserDto: CreateUserDto) {
        
        const { firstName,lastName,email,password }= _createUserDto;
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=  this.userRepository.create({
            firstName,lastName,email,password:hashedPassword
        })

        return await this.userRepository.save(newUser)
    }

    async createNewBoard(userid: number,createBoardDto: CreateBoardDto):Promise<Board> {
        const user= await this.getUserById(userid);
        const board =  this.boardRepository.create({ ...createBoardDto, user });
        return await this.boardRepository.save(board);
    }

    async getUserBoards(userid:number) {
        const boards= await this.boardService.getBoardsByUserId(userid);
        return boards;
    }

    async getUserTasks(userid:number) {
        const tasks= await this.taskService.getTasksByUserId(userid);
        return tasks;
    }

    async updateUserById(id:number,_updateUserDto: UpdateUserDto) {
        
        return await this.userRepository.update({id},{..._updateUserDto})


        }
    
    async deleteUserById(id: number): Promise<void> {
        await this.userRepository.delete({id});
        }
}


