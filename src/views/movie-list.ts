import '../components/review-block.js';

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { asyncAppend } from 'lit/directives/async-append.js';
import { ref } from 'lit/directives/ref.js';

import { imgSrc } from '../directives/img-directive.js';
import { Review } from '../models/tmdb-data-obj';
import { TmdbMovie } from '../models/tmdb-movie.js';
import { getPopularMovies } from '../tmdb.api.js';

@customElement('movie-list')
export class MovieList extends LitElement {
  static styles = css``;

  private batches: any = {
    page: 0,
    nextBatch: null,
    [Symbol.asyncIterator]() {
      return {
        next: async () => ({
          value: await new Promise((r) => (this.nextBatch = () => r(getPopularMovies((this.page += 1))))),
        }),
      };
    },
  };

  private iObs = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      this.iObs.disconnect();
      this.batches.nextBatch();
    }
  });

  firstUpdated() {
    this.batches.nextBatch();
  }

  render() {
    return html`
      ${asyncAppend(this.batches, (movies: any) =>
        movies.map(
          (m: TmdbMovie, idx: number) => html`
            <div ${idx + 1 === movies.length && ref((el) => el && this.iObs.observe(el))}>
              <img src=${imgSrc(m.poster_path, 'w154')} alt="" />
              ${m.reviews.map(
                (r: Review) => html`
                  <review-block .review=${r}></review-block>
                  <br />
                `
              )}
            </div>
          `
        )
      )}
      <loading-spinner></loading-spinner>
    `;
  }
}
