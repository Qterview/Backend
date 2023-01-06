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
  async signup(createUserDto: CreateUserDto) {
    const { Id, password, name } = createUserDto;
    const hashed = await bcrypt.hash(password, 11);

    const user = new Users();
    user.Id = Id;
    user.password = hashed;
    user.name = name;
    await this.usersRepository.save(user);
  }
}
