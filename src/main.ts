import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { chatgpt } from './util/chatgpt.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
