import { Module } from '@nestjs/common';
// import { ChatGPTAPIBrowser } from 'chatgpt'
import { UserModule } from './user/user.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module.js';
import { DataBaseConfig } from './database/typeorm/DataBaseConfig.js';
import { MongooseModule } from '@nestjs/mongoose';
// import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`${__dirname}/.env`],
      envFilePath: [`.env`],
    }),
    TypeOrmModule.forRootAsync(DataBaseConfig),
    MongooseModule.forRoot(process.env.MONGODB, {
      useNewUrlParser: true, // 몽구스에서 필요로 하는 두 번째 인자 -1
      useUnifiedTopology: true, // 몽구스에서 필요로 하는 두 번째 인자 -2
      dbName: 'Qterview',
    }),
    // UserModule,
    PostsModule,
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'Qterview',
      useNewUrlParser: true, // 몽구스에서 필요로 하는 두 번째 인자 -1
      useUnifiedTopology: true, // 몽구스에서 필요로 하는 두 번째 인자 -2
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
