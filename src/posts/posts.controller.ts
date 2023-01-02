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
  createPost(@Body('content') content) {}

  @Post('search')
  search(@Body('searchData') searchData: string) {
    return this.postsService.search(searchData);
  }
}
