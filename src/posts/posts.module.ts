import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { PostsRepository } from './posts.repository';
import { ChatgptService } from 'src/util/chatgpt';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PostsRepository])],
  controllers: [PostsController],
  providers: [
    PostsService,
    // ChatgptService
  ],
})
export class PostsModule {}
