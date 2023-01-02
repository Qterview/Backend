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

  @Post('search')
  search(@Body('content') content: string) {
    return this.postsService.search(content);
  }

  @Post('createPost')
  createPost(@Body('content') content:string){
    return this.postsService.createPost(content);
  }

}
