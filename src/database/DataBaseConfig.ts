import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

//entity
import { Posts } from 'src/entities/posts.entity';
import { Keywords } from 'src/entities/keyword.entity';
import { Users } from 'src/entities/user.entity';

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
