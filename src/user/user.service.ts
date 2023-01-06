import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity.js';
import { CreateUserDto } from './dto/create_user.dto.js';
import { UsersRepository } from './user.repository.js';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { Id, password, name } = createUserDto;
    const hashed = await bcrypt.hash(password, 11);
    const existUser = await this.usersRepository.findOne({ where: { Id: Id } });
    if (existUser) return '이미 가입된 아이디 입니다';

    const user = new Users();
    user.Id = Id;
    user.password = hashed;
    user.name = name;
    await this.usersRepository.save(user);
    return '회원가입 완료';
  }
}
