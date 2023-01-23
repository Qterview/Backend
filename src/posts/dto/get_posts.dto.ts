import { Types } from 'mongoose';

export class GetPostDto {
  _id: Types.ObjectId;
  title: string;
  content: string;
}
