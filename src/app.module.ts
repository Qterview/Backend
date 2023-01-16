import { Module } from '@nestjs/common';
// import { ChatGPTAPIBrowser } from 'chatgpt'
import { UserModule } from './user/user.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module.js';
import { DataBaseConfig } from './database/typeorm/DataBaseConfig.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema.js';
// import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`${__dirname}/.env`],
      envFilePath: [`.env`],
    }),
    // ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync(DataBaseConfig),
    MongooseModule.forRoot(process.env.MONGODB, {
      useNewUrlParser: true,	// 몽구스에서 필요로 하는 두 번째 인자 -1
      useUnifiedTopology: true,	// 몽구스에서 필요로 하는 두 번째 인자 -2	
    }),
    MongooseModule.forFeature([{name : Post.name, schema : PostSchema}]),
    // UserModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
