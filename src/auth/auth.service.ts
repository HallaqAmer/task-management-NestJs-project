import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(_createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createNewUser(_createUserDto);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      const confirmedPassword = await bcrypt.compare(password, user.password);
      if (confirmedPassword) {
        const { ...userData } = user;
        return userData;
      }

      return null;
    }

    return null;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.email, sub: user.id };
    return { jwtToken: await this.jwtService.signAsync(payload) };
  }
}
