import { CustomRepository } from '../database/typeorm-ex.decorator.js';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity.js';

@CustomRepository(Users)
export class UsersRepository extends Repository<Users> {}
