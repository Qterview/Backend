import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Res,
  Ip,
  HttpException,
} from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { Posts } from '../entities/posts.entity';
import { Response } from 'express';
import { ChatGPT } from '../util/chatgpt.js';
import { GetPostDto } from './dto/get_posts.dto.js';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private chatGPT: ChatGPT,
  ) {}

  @Get()
  getPost(@Query('page') page: string): Promise<GetPostDto[]> {
    return this.postsService.getPost(page);
  }

  @Get('search')
  search(@Body('search') search: string): Promise<GetPostDto[]> {
    return this.postsService.search(search);
  }

  @Post()
  createPost(@Body('question') question: string) {
    this.postsService.createPost(question);
    return '질문요청 완료';
  }

  @Post('like/:id')
  async likePost(@Param('id') postId: string, @Ip() clientIp: any) {
    return await this.postsService.likePost(postId, clientIp);
  }

  @Post('unlike/:id')
  async UnlikePost(@Param('id') postId: string, @Ip() clientIp: any) {
    return await this.postsService.UnlikePost(postId, clientIp);
  }
}
