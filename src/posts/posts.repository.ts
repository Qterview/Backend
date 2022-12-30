import { CustomRepository } from '../database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Posts } from './entity/posts.entity';

@CustomRepository(Posts)
export class PostsRepository extends Repository<Posts> {

}
