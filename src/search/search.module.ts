import { SearchController } from './search.controller';
/*
https://docs.nestjs.com/modules
*/

import { Get, Module } from '@nestjs/common';
import { ParserModule } from 'src/parser/parser.module';

@Module({
  imports: [ParserModule],
  controllers: [SearchController],
  providers: [],
})
export class SearchModule {}
