import { CustomRepository } from '../database/typeorm-ex.decorator.js';
import { Repository } from 'typeorm';
import { Keywords, Posts } from '../entities/posts.entity.js';

@CustomRepository(Posts)
export class PostsRepository extends Repository<Posts> {}

@CustomRepository(Keywords)
export class KeywordsRepository extends Repository<Keywords> {}
