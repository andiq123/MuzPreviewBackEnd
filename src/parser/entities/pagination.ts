import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  totalPages: number;
}
