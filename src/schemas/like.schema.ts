import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, //자동으로 등록일, 수정일을 넣어줍니다.
  _id: true, //기본 인덱스인 id값을 매핑하여 줍니다.
};

@Schema(options)
export class Like {
  @Prop({ required: true })
  postId: Types.ObjectId;

  @Prop({ required: true })
  clientIp: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
export type LikeDocument = HydratedDocument<Like>;
