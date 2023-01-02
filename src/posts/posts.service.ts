import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { MyGPT } from '../util/chatgpt.js';

// import {Queue} from '../util/queue.js'
// import { Cron } from '@nestjs/schedule';

@Injectable()
export class PostsService {
  private SIGN: number;
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
    private myGPT: MyGPT,
    // 큐 + 스케줄러 
    // private queue : Queue,
    ) {
    // 큐 + 스케줄러 
    // this.SIGN = 0;
  }

  async getPost(): Promise<any> {
    // : Promise<Posts[]> {
    return this.postsRepository.find({});
  }

  // 게시글 검색
  async search(content: string) {
    const api = global.GPTAPI;
    this.myGPT.searchGPT(api, content);

    return;
  }

  // 게시글 등록
  async createPost(content: string) {
    const api = global.GPTAPI;
    let GPTresult = this.myGPT.searchGPT(api, content);  

    // // 큐 + 스케줄러 
    // this.queue.push(content)
    return;
  }

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
