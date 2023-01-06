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
  getTest(): string {
    return 'hello!';
  }
  async signup(createUserDto: CreateUserDto): Promise<Users> {
    const { Id, password, name } = createUserDto;
    const hashed = bcrypt.hash(password);

    const user = {
      Id,
      password: hashed,
      name,
    };

    return await this.usersRepository.signup(user);
  }
}
