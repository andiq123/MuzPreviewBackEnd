import { HTMLElement, parse } from 'node-html-parser';
import { Song } from 'src/search/entities/songs';
import { Pagination } from '../entities/pagination';
import { v4 as uuid } from 'uuid';

export class SongsParser {
  private parsedHtml: HTMLElement = null;

  constructor(data: string) {
    this.parsedHtml = parse(data);
  }

  get pagination(): Pagination {
    const pagination = this.parsedHtml.querySelector('#pagination');
    if (!pagination) {
      return null;
    }

    const totalPages = pagination.querySelectorAll('a').length;
    const pageNumber = +pagination.querySelector('b').text;
    return { totalPages, pageNumber };
  }

  get songs(): Song[] {
    const results = this.parsedHtml.querySelector('.result');
    return results.querySelectorAll('.i').map((x) => {
      const artist = x.querySelector('.title').text;
      const title = x.querySelector('.tt').text;
      const duration = x.querySelector('.dur').text;
      const streamUrl = x.querySelector('.fa-download').attributes.href;
      return {
        id: uuid().toString(),
        artist,
        title,
        duration,
        streamUrl,
      };
    });
  }
}
