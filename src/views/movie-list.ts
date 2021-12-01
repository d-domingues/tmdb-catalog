import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { until } from 'lit/directives/until.js';

import { imgSrc } from '../directives/img-directive.js';
import { getPopularMovies } from '../tmdb.api.js';

@customElement('movie-list')
export class MovieList extends LitElement {
  static styles = css``;

  render() {
    return until(
      getPopularMovies().then(movies =>
        repeat(
          movies,
          m => m.id,
          m =>
            html`
              <div>
                <img src=${imgSrc(m.poster_path, 'w185')} alt="" />
              </div>
            `
        )
      ),
      html`<loading-spinner></loading-spinner>`
    );
  }
}
