import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {

    getPost():string{
        return 'get test!!!'
    }
}
