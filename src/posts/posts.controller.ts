import { Controller, Get, Post, Body } from '@nestjs/common';
import { brotliDecompressSync } from 'zlib';
import { PostsService } from './posts.service.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPost(): any {
    return this.postsService.getPost();
  }

  @Post()
  postAnswer(@Body() data): any {
    console.log('테스트');
    const { content } = data;
    return this.postsService.postAnswer(content);
  }
}
