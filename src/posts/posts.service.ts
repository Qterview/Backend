import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schemas/post.schema.js';
import { Work, WorkDocument } from '../schemas/work.schemas.js';
import { Like, LikeDocument } from '../schemas/like.schemas.js';
import { ChatGPT } from '../util/chatgpt.js';
import { GetPostDto } from './dto/get_posts.dto.js';
import { SearchDto } from './dto/search.dto.js';

// import {Queue} from '../util/queue.js'
// import { Cron } from '@nestjs/schedule';
const contents: string[] = [];
@Injectable()
export class PostsService {
  private SIGN: number;
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    @InjectModel(Work.name)
    private workModel: Model<WorkDocument>,
    @InjectModel(Like.name)
    private likeModel: Model<LikeDocument>,
    private chatGPT: ChatGPT,
  ) {}

  async getPost(page: string): Promise<GetPostDto[]> {
    const posts = await this.postModel.find({}).select({ title: 1, useful: 1 });

    return posts;
  }

  async postDetail(postId: string): Promise<GetPostDto> {
    const post = await this.postModel
      .findById(postId)
      .select({ title: 1, content: 1, useful: 1 });
    return post;
  }

  // 게시글 검색
  async search(search: SearchDto): Promise<GetPostDto[]> {
    console.log(search);
    const posts = await this.postModel.aggregate([
      {
        $search: {
          index: 'text',
          text: {
            query: `${search}`,
            path: 'title',
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          useful: 1,
        },
      },
    ]);
    return posts;
  }

  async createPost(question: string) {
    try {
      await this.workModel.create({ work: question });
      if (this.chatGPT.Working) return;
      this.chatGPT.work();
    } catch (error) {
      console.log(error);
    }
  }

  async likePost(postId: string, clientIp: string) {
    const exist = await this.likeModel.findOne({ postId, clientIp });

    if (exist) throw new HttpException('이미 평가했습니다', 400);
    await this.likeModel.create({ postId, clientIp });
    await this.postModel.findByIdAndUpdate(postId, { $inc: { useful: 1 } });
    return '평가완료';
  }

  async UnlikePost(postId: string, clientIp: string) {
    const exist = await this.likeModel.findOne({ postId, clientIp });

    if (exist) throw new HttpException('이미 평가했습니다', 400);
    await this.likeModel.create({ postId, clientIp });
    await this.postModel.findByIdAndUpdate(postId, { $inc: { useful: -1 } });
    return '평가완료';
  }

  // 큐와 스케줄을 이용한 게시글 등록
  // async createPost(content: string) {
  // const api = global.GPTAPI;
  // let GPTresult = this.myGPT.searchGPT(api, content);

  // // 큐 + 스케줄러
  // this.queue.push(content)
  // return;
  // }

  // 큐 + 스케줄러
  // @Cron('* * * * * *')
  // async handleCron() :Promise<void> {
  // try {
  //   if(this.queue.size && this.SIGN !== 1 && typeof global.GPTAPI !== 'undefined'){
  //     console.log('::::::::::> 데이터 작업 시작');
  //     this.SIGN = 1 // 스케쥴러가 접근 못하게 막음
  //     let data : string | number = this.queue.pop();

  //     if(typeof data === 'string'){
  //       let result_GPT = await this.myGPT.searchGPT(global.GPTAPI,data);
  //       console.log(result_GPT); // DB 작업
  //       this.SIGN = 0
  //     }
  //     console.log('::::::::::> 데이터 작업 끝');
  //   }else{
  //     // console.log(console.log(global.GPTAPI))
  //     console.log('-')
  //   }
  // } catch (error) {
  //   console.log(error)
  //   this.SIGN = 0
  // }
  //
  // }
}
