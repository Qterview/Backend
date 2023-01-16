import {
  Controller,
  Get,
  Post,
  ValidationPipe,
  Body,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto.js';
import { LoginUserDto } from './dto/login_user.dto.js';
import { UserService } from './user.service.js';

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //회원가입
  @Post('/signup')
  signup(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
