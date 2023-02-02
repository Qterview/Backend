import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './posts/posts.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`${__dirname}/.env`],
      envFilePath: [`.env`],
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      useNewUrlParser: true, // 몽구스에서 필요로 하는 두 번째 인자 -1
      useUnifiedTopology: true, // 몽구스에서 필요로 하는 두 번째 인자 -2
      dbName: 'Qterview',
    }),
    UserModule,
    PostsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
