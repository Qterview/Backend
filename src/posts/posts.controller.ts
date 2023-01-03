import { Controller, Get, Post, Body, Query, Param, Res } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { Posts } from '../entities/posts.entity';
import { Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPost(): any {
    return this.postsService.getPost();
  }

  @Get('search')
  search(@Query('content') content: string): Promise<Posts[]> {
    return this.postsService.search(content);
  }

  @Post()
  createPost(@Body('question') question: string, @Res() res: Response) {
    if (typeof global.GPTAPI === 'undefined') {
      return res
        .status(403)
        .send({ message: 'API연결중 입니다 잠시후 다시 시도해 주세요' });
    }

    this.postsService.createPost(question);
    return res.status(201).send({ message: '질문 등록 요청 완료' });
  }
}
