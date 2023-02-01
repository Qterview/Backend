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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { GetPostDto } from './dto/get_posts.dto';
import { SearchDto, ObjectIdDto } from './dto/requests.dto';

import { UndefinedToNullInterceptor } from '../common/undefinedToNull.interceptor';

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
  search(@Body() data: SearchDto): Promise<GetPostDto[]> {
    return this.postsService.search(data);
  }

  @Get('/:id')
  postDetail(@Param() param: ObjectIdDto): Promise<GetPostDto> {
    return this.postsService.postDetail(param);
  }

  @UseInterceptors(UndefinedToNullInterceptor)
  @ApiOperation({ summary: '게시물 등록' })
  @Post()
  createPost(@Body('question') question: string) {
    this.postsService.createPost(question);
    return '질문등록 요청 완료';
  }

  @UseInterceptors(UndefinedToNullInterceptor)
  @ApiOperation({ summary: '게시물 추천' })
  @Post('like/:id')
  async likePost(@Param() param: ObjectIdDto, @Ip() clientIp: string) {
    console.log(param.id);
    console.log(typeof clientIp);
    return await this.postsService.likePost(param, clientIp);
  }

  @UseInterceptors(UndefinedToNullInterceptor)
  @ApiOperation({ summary: '게시물 비추천' })
  @Post('unlike/:id')
  async UnlikePost(@Param() param: ObjectIdDto, @Ip() clientIp: string) {
    return await this.postsService.UnlikePost(param, clientIp);
  }
}
