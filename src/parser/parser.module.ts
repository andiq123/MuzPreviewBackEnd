import { ParserService } from './parser.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [ParserService],
  exports: [ParserService],
})
export class ParserModule {}
