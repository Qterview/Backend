import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { ChatgptService } from 'src/util/chatgpt';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
    private chatgptService: ChatgptService,
  ) {}

  async getPost(): Promise<any> {
    // : Promise<Posts[]> {
    return this.postsRepository.find({});
    // return 'test'
  }

  async postAnswer(content: string): Promise<any> {
    this.chatgptService.chatgpt(content);
  }
}
