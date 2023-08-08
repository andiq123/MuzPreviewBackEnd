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
    const results = this.parsedHtml.querySelectorAll('.playlist__item');

    return results.map((x) => {
      const artist = x.getAttribute('data-artist').valueOf();
      const title = x.getAttribute('data-name').valueOf();
      const streamUrl =
        'https://musify.club' +
        x.querySelector('.play').getAttribute('data-url').valueOf();
      const duration = x
        .querySelectorAll('.track__details')[1]
        .querySelector('.text-muted').text;

      return {
        id: uuid(),
        artist,
        title,
        duration,
        streamUrl,
      };
    });
  }
}
