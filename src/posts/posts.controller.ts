import { Controller, Get, Post } from '@nestjs/common';
import { SearchService } from './posts.service';

@Controller('search')
export class SearchController {

    constructor(private readonly searchService: SearchService) {}

    @Post()
    getPost():any {
        return this.searchService.getPost();
    }
    
}
