import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Ip,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { GetPostDetailDto, GetPostDto } from './dto/get_posts.dto';
import {
  SearchDto,
  ObjectIdDto,
  PageDto,
  QuestionDto,
} from './dto/requests.dto';

import { UndefinedToNullInterceptor } from '../common/undefinedToNull.interceptor';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '게시물 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetPostDto,
    isArray: true,
  })
  @Get()
  getPosts(@Query() query: PageDto): Promise<GetPostDto[]> {
    return this.postsService.getPost(query);
  }

  //검섹어 조회
  @ApiOperation({ summary: '게시물 검색' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetPostDto,
    isArray: true,
  })
  @Get('search/:q')
  search(@Param('q') q: string): Promise<GetPostDto[]> {
    console.log(q)
    return this.postsService.search(q);
  }


  //전체 목록 조회
  @Get('list')
  getAllPost(){
    return this.postsService.getAllPost()
  }


  @ApiOperation({ summary: '게시물 상세조회' })
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: GetPostDetailDto,
  })
  postDetail(@Param() param: ObjectIdDto): Promise<GetPostDetailDto> {
    console.log(param)
    return this.postsService.postDetail(param);
  }
  

  @UseInterceptors(UndefinedToNullInterceptor)
  @ApiOperation({ summary: '게시물 등록' })
  @ApiOkResponse({ description: '질문등록 요청 완료' })
  @Post()
  createPost(@Body() data: QuestionDto) {
    this.postsService.createPost(data);
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
