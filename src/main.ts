import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import * as fs from 'fs';
import { HttpExceptionFilter } from './common/Exception.filter.js';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module.js';

async function bootstrap() {
  // let configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  const config = new DocumentBuilder()
    .setTitle('Qterview API')
    .setDescription('Qterview API 문서입니다')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  await app.listen(port);
  console.log(`HTTP 서버가 실행되었습니다.PORT::${port}`);
}

bootstrap();
