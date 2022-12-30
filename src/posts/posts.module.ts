import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { PostsRepository } from './posts.repository';

@Module({
<<<<<<< HEAD
  controllers: [SearchController],
  providers: [SearchService, Search],
})
export class PostModule {}
=======
  imports: [
    TypeOrmExModule.forCustomRepository([PostsRepository]),
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
>>>>>>> c3e783b8ea827ab3bca7e0f91e5c446d825fb7b4
