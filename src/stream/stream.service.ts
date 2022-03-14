import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';
import { map } from 'rxjs';
import { StreamDto } from './entities/stream.dto';

@Injectable()
export class StreamService {
  constructor(private http: HttpService) {}

  async downloadFile({ url, name }: StreamDto) {
    const cleanedName = this.cleanName(name) + '.mp3';
    const link = url + '?play';
    const folder = resolve(process.cwd(), 'client');
    const folderExists = existsSync(folder);
    if (!folderExists) {
      await mkdir(folder);
    }

    //check if file exists
    const filePath = resolve(process.cwd(), 'client', cleanedName);
    const exists = existsSync(filePath);
    if (exists) {
      return { path: `/${cleanedName}` };
    }

    return this.http
      .get(link, {
        responseType: 'stream',
      })
      .pipe(
        map(async (response) => {
          await writeFile(filePath, response.data);
          return { path: `/${cleanedName}` };
        }),
      );
  }

  cleanName(name: string) {
    return name.replace(/[^a-zA-Z0-9а-яА-ЯёЁ]/g, '').trim();
  }
}
