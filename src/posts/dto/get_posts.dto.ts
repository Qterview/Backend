import { PickType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Post } from '../../schemas/post.schema.js';

export class GetPostDto extends PickType(Post, ['title', 'content'] as const) {
  _id: Types.ObjectId;
}
