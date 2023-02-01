import { PickType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { Post } from '../../schemas/post.schema.js';

export class GetPostDto extends PickType(Post, ['title', 'content'] as const) {
  @IsMongoId()
  _id: Types.ObjectId;
}
