import {
  Controller,
  Get,
  Post,
  ValidationPipe,
  Body,
  UsePipes,
} from '@nestjs/common';
import { Users } from '../entities/user.entity.js';
import { CreateUserDto } from './dto/create_user.dto.js';
import { UserService } from './user.service.js';

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //회원가입
  @Post()
  signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.signup(createUserDto);
  }
}
