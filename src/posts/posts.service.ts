import { HttpException, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { Work, WorkDocument } from '../schemas/work.schema';
import { Work2, Work2Document } from '../schemas/work2.schema';
import { Like, LikeDocument } from '../schemas/like.schema';
import { ChatGPT } from '../util/chatgpt';
import { GetPostDto } from './dto/get_posts.dto';
import { SearchDto, ObjectIdDto } from './dto/requests.dto';

// import {Queue} from '../util/queue.js'
// import { Cron } from '@nestjs/schedule';
@Injectable()
export class PostsService {
  private SIGN: number;
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    @InjectModel(Work.name)
    private workModel: Model<WorkDocument>,
    @InjectModel(Work2.name)
    private work2Model: Model<Work2Document>,
    @InjectModel(Like.name)
    private likeModel: Model<LikeDocument>,
    private chatGPT: ChatGPT,
  ) {}

  async getPost(page: string): Promise<GetPostDto[]> {
    const posts = await this.postModel.find({}).select({ title: 1, useful: 1 });

    return posts;
  }

  async postDetail(param: ObjectIdDto): Promise<GetPostDto> {
    const postId = param.id;
    const post = await this.postModel
      .findById(postId)
      .select({ title: 1, content: 1, useful: 1 });
    return post;
  }

  // 게시글 검색
  async search(data: SearchDto): Promise<GetPostDto[]> {
    const search = data.search;
    console.log(search);
    const posts = await this.postModel.aggregate([
      {
        $search: {
          index: 'text',
          text: {
            query: `${search}`,
            path: 'title',
            score: {
              function: {
                score: 'relevance',
              },
            },
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          useful: 1,
          score: { $meta: 'searchScore' },
        },
      },
    ]);
    return posts;
  }

  //게시물 등록
  async createPost(question: string) {
    try {
      if (this.chatGPT.balance) {
        this.chatGPT.balance = 0;

        await this.workModel.create({ work: question });
        if (this.chatGPT.Working_A) return;
        this.chatGPT.work_A();
      } else {
        this.chatGPT.balance = 1;

        await this.work2Model.create({ work: question });
        if (this.chatGPT.Working_B) return;
        this.chatGPT.work_B();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async likePost(param: ObjectIdDto, clientIp: string) {
    const postId = param.id;
    console.log(typeof postId);
    const exist = await this.likeModel.findOne({ postId, clientIp });

    if (exist) throw new HttpException('이미 평가했습니다', 400);
    await this.likeModel.create({ postId, clientIp });
    await this.postModel.findByIdAndUpdate(postId, { $inc: { useful: 1 } });
    return '평가완료';
  }

  async UnlikePost(param: ObjectIdDto, clientIp: string) {
    const postId = param.id;
    console.log('검색 전');
    const exist = await this.likeModel.findOne({ postId, clientIp });
    console.log('검색 후');

    if (exist) throw new HttpException('이미 평가했습니다', 400);
    await this.likeModel.create({ postId, clientIp });
    await this.postModel.findByIdAndUpdate(postId, { $inc: { useful: -1 } });
    return '평가완료';
  }
}
