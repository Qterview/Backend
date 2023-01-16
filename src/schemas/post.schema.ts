import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// const options: SchemaOptions = {
//   timestamps: true,  //자동으로 등록일, 수정일을 넣어줍니다.
//   collection : 'posts',
//   _id : true  //기본 인덱스인 id값을 매핑하여 줍니다.
// };

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
export type PostDocument = HydratedDocument<Post>;