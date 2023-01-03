import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { Posts } from '../entities/posts.entity';

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
  createPost(@Body('question') question: string) {
    return this.postsService.createPost(question);
  }
}
