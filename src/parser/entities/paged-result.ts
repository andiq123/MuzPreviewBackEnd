import { ApiProperty } from '@nestjs/swagger';

export class PagedResult<T> {
  @ApiProperty()
  items: T;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  totalPages: number;
}
