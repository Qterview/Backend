import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
// import { MyGPT } from '../util/gpt';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository, // private chatgptService: ChatgptService,
  ) {}

  async getPost(): Promise<any> {
    // : Promise<Posts[]> {
    return this.postsRepository.find({});
  }

  async postAnswer(content: string): Promise<any> {
    // let myGPT = new MyGPT();
    // let result = await myGPT.searchGPT(global.GPTAPI,content);
    // console.log(result);
    
    return;
  }
}
