import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { chatgpt } from '../util/chatgpt.js';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) // private chatgptService: ChatgptService,
  {}

  async getPost(): Promise<any> {
    // : Promise<Posts[]> {
    return this.postsRepository.find({});
    // return 'test'
  }

  async postAnswer(content: string): Promise<any> {

   return chatgpt(content);

  }
}
