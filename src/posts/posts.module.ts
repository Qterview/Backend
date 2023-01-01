import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { TypeOrmExModule } from '../database/typeorm-ex.module.js';
import { PostsRepository } from './posts.repository.js';
// import { MyGPT } from 'src/util/gpt';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PostsRepository]),
  ],
  controllers: [PostsController],
  providers: [ 
    PostsService,
    // MyGPT
  ],
})
export class PostsModule {}
