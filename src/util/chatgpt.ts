import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import mongoose, { Model, startSession } from 'mongoose';
import { Configuration, OpenAIApi } from 'openai';

import { executablePath } from 'puppeteer';
import { SocketGateway } from '../socket/socket.gateway';
import { Post, PostDocument } from '../schemas/post.schema';
import { Work, WorkDocument } from '../schemas/work.schema';
import { Work2, Work2Document } from '../schemas/work2.schema';

export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);

@Injectable()
export class ChatGPT {
  gptApi_dev: any;
  gptApi_prod_A: any;
  gptApi_prod_B: any;
  Working_A: boolean;
  Working_B: boolean;
  balance: number;

  private readonly logger = new Logger(ChatGPT.name);

  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    @InjectModel(Work.name)
    private workModel: Model<WorkDocument>,
    @InjectModel(Work2.name)
    private work2Model: Model<Work2Document>,

    private socketGateway: SocketGateway,
  ) {}

  async onModuleInit() {
    if (process.env.BUILD_ENV == 'developement') {
      await this.initGPT();
    } else {
      await this.connectAI();
    }
  }

  async connectAI() {
    try {
      const configuration_A = new Configuration({
        apiKey: process.env.OPENAI_API_KEY_A,
      });
      const configuration_B = new Configuration({
        apiKey: process.env.OPENAI_API_KEY_B,
      });

      const openai_A = new OpenAIApi(configuration_A);
      const openai_B = new OpenAIApi(configuration_B);
      this.gptApi_prod_A = openai_A;
      this.gptApi_prod_B = openai_B;
      this.work_A(); //작업시작
      this.work_B();
    } catch (e) {
      console.log(e.message);
    }
  }

  async initGPT() {
    const { ChatGPTAPIBrowser } = await importDynamic('chatgpt');
    // const browser = await this.puppeteerService.getBrowser();
    if (!process.env.OPENAI_EMAIL || !process.env.OPENAI_PASSWORD) {
      throw new Error('OPENAI_EMAIL, OPENAI_PASSWORD missing');
    }

    try {
      this.logger.log('Creating ChatGPT Browser');
      const api = new ChatGPTAPIBrowser({
        email: process.env.OPENAI_EMAIL,
        password: process.env.OPENAI_PASSWORD,
        markdown: process.env.CHATGPT_MARKDOWN || false,
        minimize: process.env.CHATGPT_MINIMIZE || false,
        // executablePath: executablePath(),
        nopechaKey: process.env.NOPECHAKEY,
      });
      this.logger.log('Initing session for ChatGPT Browser');

      if (api._browser) {
        console.log('브라우저 종료');
        await api._browser.disconnect();
      }
      await api.initSession();
      this.logger.log('Sending test message');
      const result = await api.sendMessage('Hello World!');
      console.log(result.response);
      this.gptApi_dev = api;
      this.work_A(); //작업시작
      this.work_B();
    } catch (e) {
      console.log(e);
      this.initGPT();
    }
  }

  //작업A
  async work_A() {
    this.Working_A = true;
    while (true) {
      const session = await this.postModel.startSession();
      try {
        //트랜잭션 시작
        session.startTransaction();

        //작업 검색
        const workData = await this.workModel.findOne({});

        //작업이 없을시 종료
        if (!workData) {
          this.logger.log('A작업이 없습니다.');
          this.Working_A = false;
          break;
        }

        //chatGPT 메세지 요청
        const result = await this.sendMessage(workData.work);

        if (!result)
          throw new Error(
            'API에 문제가 생겼습니다. API가 연결된 이후 자동 실행됩니다.',
          );

        //게시물 생성
        const data = await this.postModel.create(
          [
            {
              title: workData.work,
              content: result,
              useful: 0,
            },
          ],
          { session },
        );
        const postId = data[0]._id;
        //작업삭제
        await this.workModel.deleteOne({ _id: workData._id }, { session });

        //트랜잭션 성공시 커밋후 세션 종료
        await session.commitTransaction();
        session.endSession();
        this.socketGateway.alarmEvent({ data: workData.work, id: postId });
      } catch (e) {
        //실패시 롤백후 세션 종료
        await session.abortTransaction();
        session.endSession();
        console.log(e);
        break;
      }
    }
  }

  //작업 B
  async work_B() {
    this.Working_B = true;
    while (true) {
      const session = await this.postModel.startSession();

      try {
        //트랜잭션 시작
        session.startTransaction();

        //작업 검색
        const workData = await this.work2Model.findOne({});

        //작업이 없을시 종료
        if (!workData) {
          this.logger.log('B작업이 없습니다.');
          this.Working_B = false;
          break;
        }

        //chatGPT 메세지 요청
        const result = await this.sendMessage(workData.work);
        if (!result)
          throw new Error(
            'API에 문제가 생겼습니다. API가 연결된 이후 자동 실행됩니다.',
          );

        //게시물 생성
        const data = await this.postModel.create(
          [
            {
              title: workData.work,
              content: result,
              useful: 0,
            },
          ],
          { session },
        );
        const postId = data[0]._id.toString();
        console.log(postId)

        //작업삭제
        await this.work2Model.deleteOne({ _id: workData._id }, { session });

        //트랜잭션 성공시 커밋후 세션 종료
        await session.commitTransaction();
        session.endSession();
        this.socketGateway.alarmEvent({ data: workData.work, id: postId });
      } catch (e) {
        //실패시 롤백후 세션 종료
        await session.abortTransaction();
        session.endSession();
        console.log(e);
        break;
      }
    }
  }

  async sendMessage(message: string): Promise<string> {
    this.logger.log(`Send Message ${message}`);
    try {
      //개발환경(브라우저기반API),
      if (this.gptApi_dev) {
        const data = await this.gptApi_dev.sendMessage(
          `"---" 아래의 토픽에 대해 설명해줘.
          아래의 옵션들을 지켜줘.
          
          - Style : 자세하게
          - Reader level : 전문가
          - Length : 500자
          - Perspective : 개발자
          - Answer me in Korean
          ---
          ${message}`,
        );

        return data.response;
      } else if (this.gptApi_prod_B) {
        const response = await this.gptApi_prod_B.createCompletion({
          model: 'text-davinci-003',
          prompt: `Q: ${message}\nA:`,
          temperature: 0,
          max_tokens: 500,
          top_p: 1,
          stop: ['\n'],
        });

        return response.data.choices[0].text;
      } else {
        throw new Error('연결된 api가 없습니다.');
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      } else {
        console.log(e.message);
      }
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    if (this.gptApi_dev) {
      this.logger.debug('Refresh called every 1 hour');
      await this.gptApi_dev.refreshSession();
    }
  }
}
