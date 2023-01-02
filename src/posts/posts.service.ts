import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { MyGPT } from '../util/chatgpt.js';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
    private myGPT: MyGPT,
  ) {}

  async getPost(): Promise<any> {
    // : Promise<Posts[]> {
    return this.postsRepository.find({});
  }

  async search(content: string) {
    const api = global.GPTAPI;
    this.myGPT.searchGPT(api, content);
    
    return;
  }
}
