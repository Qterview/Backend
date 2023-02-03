import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Post } from '../schemas/post.schema';
import { Work } from '../schemas/work.schema';
import { Work2 } from '../schemas/work2.schema';
import { Like } from '../schemas/like.schema';
import { ChatGPT } from '../util/chatgpt';

describe('PostsService', () => {
  let service: PostsService;

  class MockPostModel {
    find() {
      return {
        select: () => {
          return [
            { title: '트랜잭션에 대해 설명하세요', content: '...설명 내용' },
            { title: 'Node.js에 대해 설명하세요', content: '...설명 내용' },
          ];
        },
      };
    }
    findById() {
      return {
        select: () => {
          return {
            title: '트랜잭션에 대해 설명하세요',
            content: '...설명 내용',
          };
        },
      };
    }
  }
  class MockWorkModel {}
  class MockWork2Model {}
  class MockLikeModel {}

  class MockChatGPT {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getModelToken(Post.name), useClass: MockPostModel },
        { provide: getModelToken(Work.name), useClass: MockWorkModel },
        { provide: getModelToken(Work2.name), useClass: MockWork2Model },
        { provide: getModelToken(Like.name), useClass: MockLikeModel },
        { provide: ChatGPT, useClass: MockChatGPT },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getPost호출시 게시글 목록 return', async () => {
    const posts = [
      { title: '트랜잭션에 대해 설명하세요', content: '...설명 내용' },
      { title: 'Node.js에 대해 설명하세요', content: '...설명 내용' },
    ];

    expect(await service.getPost({ page: 0 })).toStrictEqual(posts);
  });

  it('getPost호출시 게시글 return', async () => {
    const post = {
      title: '트랜잭션에 대해 설명하세요',
      content: '...설명 내용',
    };

    expect(
      await service.postDetail({ id: '63c498f674390c392b31885c' }),
    ).toStrictEqual(post);
  });
});
