import { ApiProperty } from '@nestjs/swagger';

export class Song {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  artist: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  streamUrl: string;
}
