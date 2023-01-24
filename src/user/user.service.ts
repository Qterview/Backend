import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create_user.dto.js';
import { LoginUserDto } from './dto/login_user.dto.js';
import bcrypt from 'bcrypt';
import e from 'express';

@Injectable()
export class UserService {
  constructor() {}

  async signup(createUserDto: CreateUserDto) {
    // const { Id, password, name } = createUserDto;
    // const hashed = await bcrypt.hash(password, 11);
    // const existUser = await this.usersRepository.findUserbyId(Id);
    // if (existUser) return '이미 가입된 아이디 입니다';

    return '회원가입 완료';
  }

  async login(loginUserDto: LoginUserDto) {
    // const { Id, password } = loginUserDto;
    // const existUser = await this.usersRepository.findUserbyId(Id);
    // if (!existUser) throw new HttpException('존재하지 않는 아이디 입니다', 400);
    // const passwordVerify = bcrypt.compare(password, existUser.password);
    // if (!passwordVerify) return '비밀번호 오류';
    //로그인 인증방식
  }
}
