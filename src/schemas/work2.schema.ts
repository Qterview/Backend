import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, //자동으로 등록일, 수정일을 넣어줍니다.
  _id: true, //기본 인덱스인 id값을 매핑하여 줍니다.
};

@Schema(options)
export class Work2 {
  @Prop({ required: true })
  work: string;
}

export const Work2Schema = SchemaFactory.createForClass(Work2);
export type Work2Document = HydratedDocument<Work2>;
