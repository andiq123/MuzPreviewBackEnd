import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { StreamDto } from './entities/stream.dto';
import { StreamService } from './stream.service';

@Controller('stream')
export class StreamController {
  constructor(private streamService: StreamService) {}
  @Post()
  downloadFile(@Body() streamDto: StreamDto) {
    return this.streamService.downloadFile(streamDto);
  }
}
