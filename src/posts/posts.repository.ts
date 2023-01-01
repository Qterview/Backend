import { CustomRepository } from '../database/typeorm-ex.decorator.js';
import { Repository } from 'typeorm';
import { Posts } from '../entities/posts.entity.js';

@CustomRepository(Posts)
export class PostsRepository extends Repository<Posts> {}
