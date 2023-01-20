import { Controller, Get, Post, Body, Query, Param, Res } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { Posts } from '../entities/posts.entity';
import { Response } from 'express';
import { ChatGPT } from '../util/chatgpt.js';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private chatGPT: ChatGPT,
  ) {}

  @Get()
  getPost(): any {
    return this.postsService.getPost();
  }

  @Get('search')
  search(@Body('search') search: string): Promise<Posts[]> {
    return this.postsService.search(search);
  }

  @Post()
  createPost(@Body('question') question: string, @Res() res: Response) {
    this.postsService.createPost(question);
    return res.status(201).send({ message: '질문 등록 요청 완료' });
  }
}
