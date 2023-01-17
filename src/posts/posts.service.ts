import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Db, Like } from 'typeorm';
import { MyGPT } from '../util/chatgpt.js';
import { PostsRepository, KeywordsRepository } from './posts.repository.js';
import { Keywords, Posts } from '../entities/posts.entity.js';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schemas/post.schema.js';
import { Work, WorkDocument } from '../schemas/work.chemas.js';

// import {Queue} from '../util/queue.js'
// import { Cron } from '@nestjs/schedule';
const contents: string[] = [];
@Injectable()
export class PostsService {
  private SIGN: number;
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,

    @InjectRepository(KeywordsRepository)
    private keywordsRepository: KeywordsRepository,
    private readonly httpService: HttpService,
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    @InjectModel(Work.name)
    private workModel: Model<WorkDocument>,
  ) {}

  async getPost(): Promise<any> {
    // : Promise<Posts[]> {
    return await this.postModel.find({});
  }

  // 게시글 검색
  async search(search?: string): Promise<Posts[]> {
    console.log(search);
    const posts = await this.postModel.aggregate([
      {
        $search: {
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
          _id: 0,
          title: 1,
          content: 1,
        },
      },
    ]);

    return posts;
  }

  async createPost(question: string) {
    try {
      // 작업 처리중 상태 이면 배열에 저장만하고 리턴
      if (contents.length) {
        contents.push(question);
        return;
      }

      contents.push(question);

      //배열에 있는 작업 처리
      while (contents.length) {
        const question = contents[0];
        const result = await global.GPTAPI.sendMessage(question);

        console.log(result.response);
        const answer = result.response;
        await this.postModel.create({ title: question, content: answer });

        const keywords = new Keywords();
        contents.shift();
        //키워드 추출 요청후 DB에 저장
        // const payload = { data: answer };
        // const { data } = await firstValueFrom(
        //   this.httpService.post('http://localhost:5000/keybert', payload),
        // );
        // const keyword: string[] = data.keyword;
        // keyword.forEach((keyword) => {
        //   keywords.postId = PostCreate.postId;
        //   keywords.keyword = keyword;
        // });
      }
    } catch (error) {
      console.log(error);
    }

    // 큐 + 스케줄러방식
    // return await api.sendMessage(content);
  }

  async savePost(title: string, content: string) {}

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
