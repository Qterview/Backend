import { Module } from '@nestjs/common';
import { databaseProviders } from './mongoose.providers.js';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class MongooseModule {}
