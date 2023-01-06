import { CustomRepository } from '../database/typeorm-ex.decorator.js';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity.js';
import { LoginUserDto } from './dto/login_user.dto.js';

@CustomRepository(Users)
export class UsersRepository extends Repository<Users> {
  async findUserbyId(Id: string) {
    return await this.findOne({ where: { Id: Id } });
  }
}
