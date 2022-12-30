import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ChatGPTAPIBrowser } from 'chatgpt'
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Users} from './user/entity/user.entity'
import { SearchModule } from './search/search.module';
import { Posts } from './search/entity/post.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`${__dirname}/.env`],
      envFilePath: [`.env`],
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST') ,
          port: +configService.get<number>('DB_PORT') ,
          username: configService.get('DB_USER') ,
          database: configService.get('DB_NAME') ,
          password: configService.get('DB_PASSWORD') ,
          //entities: [__dirname + '/**/*.entity{.ts,.js}'],
          entities: [Users, Posts],
          synchronize: false,
        };
      },
    }),
    UserModule,
    SearchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
