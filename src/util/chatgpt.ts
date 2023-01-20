import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ChatGPTError } from 'chatgpt';
import { Model, startSession } from 'mongoose';
import { executablePath } from 'puppeteer';
import { Post, PostDocument } from '../schemas/post.schema.js';
import { Work, WorkDocument } from '../schemas/work.schemas.js';

export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);

@Injectable()
export class ChatGPT {
  gptApi: any;
  Working: boolean;
  private readonly logger = new Logger(ChatGPT.name);

  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    @InjectModel(Work.name)
    private workModel: Model<WorkDocument>,
  ) {}

  async onModuleInit() {
    // await this.initGPT();
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
        executablePath: executablePath(),
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
      this.gptApi = api;
      this.work(); //작업시작
    } catch (e) {
      console.log(e);
      console.log(e.name);
      this.initGPT();
    }
  }

  async work() {
    this.Working = true;
    while (true) {
      // const session = await startSession();
      try {
        //트랜잭션 시작
        // session.startTransaction();

        //작업 검색
        const workData = await this.workModel.findOne({});

        //작업이 없을시 종료
        if (!workData) {
          this.logger.log('작업이 없습니다.');
          this.Working = false;
          break;
        }

        //chatGPT 메세지 요청
        const result = await this.sendMessage(workData.work);

        //게시물 생성
        await this.postModel.create(
          {
            title: workData.work,
            content: result.response,
          },
          // { session },
        );

        //작업삭제
        await this.workModel.deleteOne(
          { _id: workData._id },
          //  { session }
        );

        //트랜잭션 성공시 커밋후 세션 종료
        // await session.commitTransaction();
        // session.endSession();
      } catch (e) {
        //실패시 롤백후 세션 종료
        // await session.abortTransaction();
        // session.endSession();
        console.log(e);
        console.log(e.name);
        this.initGPT();
      }
    }
  }
  async sendMessage(
    message: string,
    conversationId?: string | undefined,
    parentMessageId?: string | undefined,
  ): Promise<{ response: string; conversationId: string; messageId: string }> {
    this.logger.log(`Send Message ${message}`);
    let response:
      | { response: string; conversationId: string; messageId: string }
      | undefined;
    if (!conversationId) {
      response = await this.gptApi.sendMessage(message, {
        timeoutMs: 2 * 60 * 1000,
      });
    } else {
      response = await this.gptApi.sendMessage(message, {
        conversationId,
        parentMessageId,
        timeoutMs: 2 * 60 * 1000,
      });
    }
    return response;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Refresh called every 1 hour');
    if (this.gptApi) {
      await this.gptApi.refreshSession();
    }
  }
}
