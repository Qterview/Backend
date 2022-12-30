import { Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @Get()
    getPost():any {
        return this.postsService.getPost();
    }
    
}
