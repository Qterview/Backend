import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schemas/post.schema.js';
import { Work, WorkSchema } from '../schemas/work.schema.js';
import { Like, LikeSchema } from '../schemas/like.schema.js';
import { ChatGPT } from '../util/chatgpt.js';
// import {Queue} from '../util/queue.js'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Work.name, schema: WorkSchema },
      { name: Like.name, schema: LikeSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, ChatGPT],
  exports: [PostsService],
})
export class PostsModule {}
