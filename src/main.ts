import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { MyGPT } from './util/chatgpt.js';
import * as fs from 'fs';

async function bootstrap() {
  let configService = new ConfigService();
  const port = 3000;

  if (configService.get<string>('BUILD_ENV') === 'production') {
    const httpsOptions = {
      key: fs.readFileSync(configService.get<string>('KEY')),
      cert: fs.readFileSync(configService.get<string>('CERT')),
    };

    const app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
    app.enableCors();

    await app.listen(port);
    console.log(`HTTPS 서버가 실행되었습니다.PORT::${port}`);
  } else {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    await app.listen(port);
    console.log(`HTTP 서버가 실행되었습니다.PORT::${port}`);
  }
//   const myGPT = new MyGPT();

//   // gpt에 사용되는 api 생성
//   myGPT.createAPI(
//     configService.get<string>('OPENAI_EMAIL'),
//     configService.get<string>('OPENAI_PASSWORD'),
//     configService.get<string>('NOPECHAKEY'),
//   );
}

bootstrap();
