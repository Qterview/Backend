import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ChatGPTAPIBrowser } from 'chatgpt'
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { Users } from './user/entity/user.entity';
import { PostModule } from './posts/posts.module';
import { Posts } from './posts/entity/posts.entity';
=======
import { PostsModule } from './posts/posts.module';
import { DataBaseConfig } from './database/DataBaseConfig'


>>>>>>> c3e783b8ea827ab3bca7e0f91e5c446d825fb7b4

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`${__dirname}/.env`],
      envFilePath: [`.env`],
    }),

<<<<<<< HEAD
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USER'),
          database: configService.get('DB_NAME'),
          password: configService.get('DB_PASSWORD'),
          //entities: [__dirname + '/**/*.entity{.ts,.js}'],
          entities: [Users, Posts],
          synchronize: false,
        };
      },
    }),
    UserModule,
    PostModule,
=======
    TypeOrmModule.forRootAsync(DataBaseConfig),
    // UserModule,
    PostsModule
>>>>>>> c3e783b8ea827ab3bca7e0f91e5c446d825fb7b4
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
