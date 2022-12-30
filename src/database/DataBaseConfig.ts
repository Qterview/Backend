import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Posts } from '../posts/entity/posts.entity'

export const DataBaseConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'mariadb',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      synchronize: true,
      // ADD ENTITIES
      entities: [Posts],
    }),
    inject: [ConfigService],
  };

