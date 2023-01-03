import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { brotliDecompressSync } from 'zlib';
import { PostsService } from './posts.service.js';
import { Posts } from '../entities/posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPost(): any {
    return this.postsService.getPost();
  }

<<<<<<< HEAD
  @Post()
  createPost(@Body('content') content) {}

  @Post('search')
  search(@Body('searchData') searchData: string) {
    return this.postsService.search(searchData);
=======
  @Get('search')
  search(@Query('content') content: string) : Promise<Posts[]> {
    return this.postsService.search(content);
>>>>>>> d2988ae19a2cb28a4908a94961b9db7d7db3fee4
  }

  @Post('createPost')
  createPost(@Body('content') content:string){
    return this.postsService.createPost(content);
  }

}
