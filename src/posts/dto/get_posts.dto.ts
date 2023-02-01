import { ApiProduces, ApiProperty, PickType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { ObjectId, Types } from 'mongoose';
import { Post } from '../../schemas/post.schema.js';

export class GetPostDto extends PickType(Post, ['title', 'useful'] as const) {
  @ApiProperty({ description: '게시물 ID' })
  @IsMongoId()
  _id: Types.ObjectId;
}

export class GetPostDetailDto extends PickType(Post, [
  'title',
  'content',
  'useful',
] as const) {
  @ApiProperty({ description: '게시물 ID' })
  @IsMongoId()
  _id: Types.ObjectId;
}
