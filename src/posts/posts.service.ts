import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { MyGPT } from '../util/chatgpt.js';
import { PostsRepository } from './posts.repository.js';
import { Posts } from '../entities/posts.entity.js';
import { connect } from 'http2';

// import {Queue} from '../util/queue.js'
// import { Cron } from '@nestjs/schedule';
const contents: string[] = [];
@Injectable()
export class PostsService {
  private SIGN: number;
  constructor(
    @InjectRepository(PostsRepository)
    public postsRepository: PostsRepository,
    private myGPT: MyGPT, // 큐 + 스케줄러 // private queue : Queue,
  ) {
    // 큐 + 스케줄러
    // this.SIGN = 0;
  }

  async getPost(): Promise<any> {
    // : Promise<Posts[]> {
    return this.postsRepository.find({});
  }

  // 게시글 검색
  async search(content?: string): Promise<Posts[]> {
    let searchResult: Posts[] = await this.postsRepository.findBy({
      title: Like(`%${content}%`),
    });

    console.log(searchResult);

    return searchResult;
  }

  async createPost(question: string) {
    try {
      // 미인증 상황에 요청이 들어오거나 작업 처리중 상태 이면 배열에 저장만하고 리턴
      if (contents.length || typeof global.GPTAPI === 'undefined') {
        contents.push(question);
        return;
      }

      contents.push(question);

      //배열에 있는 작업 처리
      while (contents.length) {
        const question = contents[0];
        const result = await global.GPTAPI.sendMessage(question);

        console.log(result.response);

        const post = new Posts();
        post.title = question;
        post.content = result.response;
        await this.postsRepository.save(post);
        contents.shift();
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
