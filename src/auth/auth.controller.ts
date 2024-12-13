import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res) {
    try {
      const { email, password } = body;
      const token = await this.authService.login(email, password);
      res.status(200).json(token);
    } catch (err) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  @Get('logout')
  logoutUser() {}
}
