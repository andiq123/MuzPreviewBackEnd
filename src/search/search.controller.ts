import { Controller, Get, Query } from '@nestjs/common';
import { ParserService } from 'src/parser/parser.service';
import { SearchParams } from './entities/search-params';

@Controller('search')
export class SearchController {
  constructor(private parser: ParserService) {}

  @Get()
  getSongs(@Query() params: SearchParams) {
    return this.parser.getSongs(params);
  }

  @Get('main')
  getMainSongs() {
    return this.parser.getMainSongs();
  }
}
