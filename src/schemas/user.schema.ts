import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, //자동으로 등록일, 수정일을 넣어줍니다.
  _id: true, //기본 인덱스인 id값을 매핑하여 줍니다.
};

@Schema(options)
export class User {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
