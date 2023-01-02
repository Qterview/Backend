import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { MyGPT } from './util/chatgpt.js';

const myGPT = new MyGPT();

async function bootstrap() {
  let configService = new ConfigService();
  const app = await NestFactory.create(AppModule);

  // gpt에 사용되는 api 생성
  myGPT.createAPI(
    configService.get<string>('OPENAI_EMAIL'),
    configService.get<string>('OPENAI_PASSWORD'),
    configService.get<string>('NOPECHAKEY'),
  );

  await app.listen(3000);
}

bootstrap();
