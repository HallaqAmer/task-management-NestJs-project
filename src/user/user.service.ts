import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>){

    }

    async getAllUsers() :Promise<User[]> {
        return this.userRepository.find()
    }

    async getUserById(id:number): Promise<User> {
        return this.userRepository.findOneBy({ id });
      }

    async findUserByEmail(email:string): Promise<User | undefined> {

        return this.userRepository.findOne({where: {email}})
    }

    async createNewUser(_createUserDto: CreateUserDto) {
        
        const { firstName,lastName,email,password }= _createUserDto;
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser= this.userRepository.create({
            firstName,lastName,email,password:hashedPassword
        })

        return this.userRepository.save(newUser)
    }

    async updateUserById(id:number,_updateUserDto: UpdateUserDto) {
        

            return
        }
    
        
        
    

    async deleteUserById(id: number): Promise<void> {
        await this.userRepository.delete(id);
        }
}
