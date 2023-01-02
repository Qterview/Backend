import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity.js';

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
    // return 'test'
  }

  async search(searchData: string) {
    return searchData;
  }

  async post(title: string, content: string) {
    const post = new Posts();
    post.title = title;
    post.content = content;
    await this.postsRepository.save(post);
  }
}
