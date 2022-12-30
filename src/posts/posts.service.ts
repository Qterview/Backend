import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entity/posts.entity'

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostsRepository)
        private postsRepository: PostsRepository,
    ){}

    async getPost():Promise<any> { // : Promise<Posts[]> {
        return this.postsRepository.find({});
        // return 'test'
    }
}
