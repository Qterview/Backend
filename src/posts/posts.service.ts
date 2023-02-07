import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { Work, WorkDocument } from '../schemas/work.schema';
import { Work2, Work2Document } from '../schemas/work2.schema';
import { Like, LikeDocument } from '../schemas/like.schema';
import { ChatGPT } from '../util/chatgpt';
import { GetPostDetailDto, GetPostDto } from './dto/get_posts.dto';
import {
  SearchDto,
  ObjectIdDto,
  PageDto,
  QuestionDto,
} from './dto/requests.dto';

// import {Queue} from '../util/queue.js'
// import { Cron } from '@nestjs/schedule';
@Injectable()
export class PostsService {
  constructor(
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

  /**게시글 목록
   * @param {PageDto} query 불러올 게시글 페이지
   * @returns 게시글 목록 리스트
   */
  async getPost(query: PageDto): Promise<GetPostDto[]> {
    const page = query.page;
    console.log(typeof page);
    const posts = await this.postModel
      .find({})
      .select({ title: 1, useful: 1, content: 1 });
    return posts;
  }

  async getAllPost(){
    const list = await this.postModel.find();
    return list.map(v => {
      return {
        id : v._id, 
        question : v.title,
        answer: v.content,
        like: v.useful
      }
    })
  }


  /** 게시글 상세 조회
   * @param {ObjectIdDto} param 불러올 게시글 ID
   * @returns 게시글 상세 정보
   */
  async postDetail(param: ObjectIdDto): Promise<GetPostDetailDto> {
    const postId = param.id;
    const post = await this.postModel
      .findById(postId)
      .select({ title: 1, content: 1, useful: 1 });
    return post;
  }

  /** 게시글 검색
   * @param {SearchDto} data 검색할 데이터
   * @returns 검색 결과 게시물 리스트
   */
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

  /** 게시물 등록
   * @param {QuestionDto} data 게시물 생성할 질문
   * @return 게시물 생성 요청을 추가하고 리턴함
   */
  async createPost(data: QuestionDto) {
    const question = data.question;
    try {
      //작업 분할
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

  /** 게시물 추천
   * @param {ObjectIdDto} param 추천할 게시물 ID
   * @return 정상적인 메세지를 리턴함
   */
  async likePost(param: ObjectIdDto, clientIp: string) {
    const postId = param.id;

    const existPost = await this.postModel.findById(postId);
    if (!existPost) throw new HttpException('존재하지 않는 게시글 입니다', 400);

    const existLike = await this.likeModel.findOne({ postId, clientIp });
    if (existLike) throw new HttpException('이미 평가했습니다', 400);

    await this.likeModel.create({ postId, clientIp });
    await this.postModel.findByIdAndUpdate(postId, { $inc: { useful: 1 } });
    return '평가완료';
  }

  /** 게시물 비추천
   * @param {ObjectIdDto} param 추천할 게시물 ID
   * @return 정상적인 메세지를 리턴함
   */
  async UnlikePost(param: ObjectIdDto, clientIp: string) {
    const postId = param.id;

    const existPost = await this.postModel.findById(postId);
    if (!existPost) throw new HttpException('존재하지 않는 게시글 입니다', 400);

    const existLike = await this.likeModel.findOne({ postId, clientIp });
    if (existLike) throw new HttpException('이미 평가했습니다', 400);

    await this.likeModel.create({ postId, clientIp });
    await this.postModel.findByIdAndUpdate(postId, { $inc: { useful: -1 } });
    return '평가완료';
  }
}
