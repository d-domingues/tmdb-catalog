import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getYear, isMovie, TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { imgSrc } from '../directives/img-directive.js';
import { horizontalDisplaySyles } from './styles.js';

@customElement('horizontal-display')
export class HorizontalDisplay extends LitElement {
  static styles = horizontalDisplaySyles;

  @property() title: string = '';
  @property({ type: Array }) items!: TmdbDataObj[];

  render() {
    return html`
      <h5>${this.title}</h5>
      ${this.items.map(
        item => html`
          <div class="movie-card">
            <a href="details/${isMovie(item) ? 'movie/' : 'tv/'}${item.id}">
              <img src=${imgSrc(item.poster_path, 'w185')} alt="" />
            </a>
            <b class="label"> ${isMovie(item) ? item.title : item.name} (${getYear(item)}) </b>
            <span class="rating">
              ${item.vote_average}
              <star-rating size="16" rating=${item.vote_average}></star-rating>
            </span>
          </div>
        `
      )}
    `;
  }
}
