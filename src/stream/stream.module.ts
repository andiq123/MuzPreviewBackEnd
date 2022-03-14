import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}
