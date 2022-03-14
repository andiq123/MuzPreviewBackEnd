import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchParams {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  query: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  page: number;
}
