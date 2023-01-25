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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service.js';
import { GetPostDto } from './dto/get_posts.dto.js';
import { SearchDto } from './dto/search.dto.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '게시물 목록 조회' })
  @Get()
  getPosts(@Query('page') page: string): Promise<GetPostDto[]> {
    return this.postsService.getPost(page);
  }

  @ApiOperation({ summary: '게시물 검색' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: Promise<GetPostDto[]>,
  })
  @Get('search')
  search(@Body('search') search: SearchDto): Promise<GetPostDto[]> {
    return this.postsService.search(search);
  }

  @Get('/:id')
  postDetail(@Param('id') postId: string): Promise<GetPostDto> {
    return this.postsService.postDetail(postId);
  }

  @ApiOperation({ summary: '게시물 등록' })
  @Post()
  createPost(@Body('question') question: string) {
    this.postsService.createPost(question);
    return '질문요청 완료';
  }

  @ApiOperation({ summary: '게시물 추천' })
  @Post('like/:id')
  async likePost(@Param('id') postId: string, @Ip() clientIp: any) {
    return await this.postsService.likePost(postId, clientIp);
  }

  @ApiOperation({ summary: '게시물 비추천' })
  @Post('unlike/:id')
  async UnlikePost(@Param('id') postId: string, @Ip() clientIp: any) {
    return await this.postsService.UnlikePost(postId, clientIp);
  }
}
