import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

//entity
import { Posts } from '../entities/posts.entity.js';

import { Keywords } from '../entities/keyword.entity.js';
import { Users } from '../entities/user.entity.js';

export const DataBaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: true,
    // ADD ENTITIES
    entities: [Posts, Keywords, Users],
  }),
  inject: [ConfigService],
};
