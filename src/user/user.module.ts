import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmExModule } from '../database/typeorm-ex.module.js';
import { UsersRepository } from './user.repository.js';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UsersRepository]), HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
