import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import mongoose, { Model, startSession } from 'mongoose';
import { Configuration, OpenAIApi } from 'openai';
import { executablePath } from 'puppeteer';
import { Post, PostDocument } from '../schemas/post.schema';
import { Work, WorkDocument } from '../schemas/work.schema';

export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);

@Injectable()
export class ChatGPT {
  gptApi_dev: any;
  gptApi_prod: any;
  Working: boolean;
  private readonly logger = new Logger(ChatGPT.name);

  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    @InjectModel(Work.name)
    private workModel: Model<WorkDocument>,
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
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);
      this.gptApi_prod = openai;
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
      this.gptApi_dev = api;
      this.work(); //작업시작
    } catch (e) {
      console.log(e);
      this.initGPT();
    }
  }

  async work() {
    this.Working = true;
    while (true) {
      const session = await this.postModel.startSession();
      try {
        //트랜잭션 시작
        session.startTransaction();

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
        if (!result)
          throw new Error(
            'API에 문제가 생겼습니다. API가 연결된 이후 자동 실행됩니다.',
          );
        //게시물 생성
        await this.postModel.create(
          [
            {
              title: workData.work,
              content: result,
              useful: 0,
            },
          ],
          { session },
        );

        //작업삭제
        await this.workModel.deleteOne({ _id: workData._id }, { session });

        //트랜잭션 성공시 커밋후 세션 종료
        await session.commitTransaction();
        session.endSession();
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
      } else if (this.gptApi_prod) {
        const response = await this.gptApi_prod.createCompletion({
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
    this.logger.debug('Refresh called every 1 hour');
    if (this.gptApi_dev) {
      await this.gptApi_dev.refreshSession();
    }
  }
}
