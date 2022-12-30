import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PostsRepository]),
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
