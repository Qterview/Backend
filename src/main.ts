import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { MyGPT } from './util/chatgpt.js';

<<<<<<< HEAD
=======
// const myGPT = new MyGPT();

>>>>>>> d2988ae19a2cb28a4908a94961b9db7d7db3fee4
async function bootstrap() {
  let configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  const myGPT = new MyGPT();
  // gpt에 사용되는 api 생성
  // myGPT.createAPI(
  //   configService.get<string>('OPENAI_EMAIL'),
  //   configService.get<string>('OPENAI_PASSWORD'),
  //   configService.get<string>('NOPECHAKEY'),
  // ); 

  await app.listen(3000);
}

bootstrap();
