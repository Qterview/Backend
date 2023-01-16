import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { TypeOrmExModule } from '../database/typeorm/typeorm-ex.module.js';

import { PostsRepository, KeywordsRepository } from './posts.repository.js';
import { MyGPT } from '../util/chatgpt.js';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '../database/mongoose/mongoose.module.js';
import { postsProviders } from '../model/post.providers.js';
// import {Queue} from '../util/queue.js'

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PostsRepository, KeywordsRepository]),
    HttpModule,
    MongooseModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    MyGPT,
    ...postsProviders,
    // Queue
  ],
  exports: [PostsService],
})
export class PostsModule {}
