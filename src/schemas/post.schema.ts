import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, //자동으로 등록일, 수정일을 넣어줍니다.
  _id: true, //기본 인덱스인 id값을 매핑하여 줍니다.
};

@Schema(options)
export class Post {
  @ApiProperty({
    example: 'Nest.js에 대해서 설명하세요.',
    description: '게시물 제목',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: '답변 내용',
  })
  @Prop({ required: true })
  content: string;

  @ApiProperty({
    example: 3,
    description: '게시물 추천수',
  })
  @Prop({ required: true })
  useful: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
export type PostDocument = HydratedDocument<Post>;
