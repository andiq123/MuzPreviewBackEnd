import { StreamModule } from './stream/stream.module';
import { ParserModule } from './parser/parser.module';
import { SearchModule } from './search/search.module';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    StreamModule,
    ParserModule,
    SearchModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
