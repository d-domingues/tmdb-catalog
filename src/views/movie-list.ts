import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { asyncAppend } from 'lit/directives/async-append.js';
import { ref } from 'lit/directives/ref.js';

import { TmdbMovie } from '../../models/tmdb-movie.js';
import { imgSrc } from '../directives/img-directive.js';
import { getPopularMovies } from '../tmdb.api.js';

let emitter: (value: TmdbMovie[]) => void;

async function* generator(): AsyncGenerator {
  while (true) {
    // eslint-disable-next-line no-loop-func
    yield new Promise(resolve => (emitter = resolve));
  }
}

@customElement('movie-list')
export class MovieList extends LitElement {
  static styles = css``;

  private isLoading = false;
  private asyncIterator = generator();
  private page = 0;

  setIntersectionObserver(el: Element | undefined) {
    if (el) {
      const iObs = new IntersectionObserver(async entries => {
        if (entries.find(e => e.isIntersecting)) {
          await this.nextBatch();
          iObs.disconnect();
        }
      });

      iObs.observe(el);
    }
  }

  firstUpdated() {
    this.nextBatch();
  }

  async nextBatch() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.page += 1;
      const movies = await getPopularMovies(this.page);
      emitter(movies);
      this.isLoading = false;
    }
  }

  render() {
    return html`
      ${asyncAppend(this.asyncIterator, (movies: any) =>
        movies.map(
          (m: TmdbMovie, idx: number) => html`
            <div ${idx + 1 === movies.length && ref(this.setIntersectionObserver)}>
              <img src=${imgSrc(m.poster_path, 'w154')} alt="" />
            </div>
          `
        )
      )}
      ${true && html`<loading-spinner></loading-spinner>`}
    `;
  }
}
