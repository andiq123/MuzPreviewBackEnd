import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { map, Observable } from 'rxjs';
import { SearchParams } from 'src/search/entities/search-params';
import { Song } from 'src/search/entities/songs';
import { PagedResult } from './entities/paged-result';
import { SongsParser } from './utils/songs-parser';

@Injectable()
export class ParserService {
  private baseUrl = 'https://stand.hitplayer.ru/';
  private searchUrl = this.baseUrl + '';
  private debugMode = false;

  constructor(private http: HttpService) {}

  async getSongs({
    query,
    page,
  }: SearchParams): Promise<
    Observable<Promise<PagedResult<Song[]>>> | PagedResult<Song[]>
  > {
    const filePath = resolve(process.cwd(), 'client', 'index.html');
    if (this.debugMode && existsSync(filePath)) {
      const data = await readFile(filePath);
      return this.getPaginationAndSongs(data);
    }
    return this.http.get(`${this.searchUrl}?s=${query}&p=${page}`).pipe(
      map(async (response) => {
        if (this.debugMode) {
          await writeFile(filePath, response.data);
        }
        return this.getPaginationAndSongs(response.data);
      }),
    );
  }

  async getMainSongs() {
    const filePath = resolve(process.cwd(), 'client', 'index.html');
    if (this.debugMode && existsSync(filePath)) {
      const data = await readFile(filePath);
      return this.getPaginationAndSongs(data);
    }
    return this.http.get(this.baseUrl).pipe(
      map(async (response) => {
        if (this.debugMode) {
          await writeFile(filePath, response.data);
        }
        return this.getPaginationAndSongs(response.data);
      }),
    );
  }

  getPaginationAndSongs(data: any) {
    const { pagination, songs } = new SongsParser(data);

    if (songs.length === 0) {
      throw new NotFoundException('No songs found');
    }

    if (!pagination) {
      return {
        items: songs,
        pageNumber: 0,
        pageSize: songs.length,
        totalPages: 0,
      } as PagedResult<Song[]>;
    }

    return {
      items: songs,
      pageNumber: pagination.pageNumber,
      pageSize: songs.length,
      totalPages: pagination.totalPages,
    } as PagedResult<Song[]>;
  }
}
