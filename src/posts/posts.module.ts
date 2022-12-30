import { Module } from '@nestjs/common';
import { SearchController } from './posts.controller';
import { SearchService } from './posts.service';
import { Search } from './posts.repository';

@Module({
  controllers: [SearchController],
  providers: [SearchService, Search]
})
export class SearchModule {}
