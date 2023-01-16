import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { TypeOrmExModule } from '../database/typeorm/typeorm-ex.module.js';

import { PostsRepository, KeywordsRepository } from './posts.repository.js';
import { MyGPT } from '../util/chatgpt.js';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schemas/post.schema.js';
// import {Queue} from '../util/queue.js'

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PostsRepository, KeywordsRepository]),
    HttpModule,
    MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    MyGPT,
    // Queue
  ],
  exports: [PostsService],
})
export class PostsModule {}
