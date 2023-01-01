import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  getTest(): string {
    return 'hello!';
  }
  //   async signup(userData: CreateUserDto): Promise<Users> {
  //     const { password } = CreateUserDto;
  //     const newUser = await this.usersRepository.create(userData);
  //     await this.usersRepository.save(newUser);
  //     return newUser;
  //   }
}
