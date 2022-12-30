import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ChatGPTAPIBrowser } from 'chatgpt'
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { DataBaseConfig } from './database/DataBaseConfig'



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`${__dirname}/.env`],
      envFilePath: [`.env`],
    }),

    TypeOrmModule.forRootAsync(DataBaseConfig),
    // UserModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
