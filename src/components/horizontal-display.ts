import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getMediaType, getName, getYear, TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { imgSrc } from '../directives/img-directive.js';
import { horizontalDisplaySyles } from './styles.js';

@customElement('horizontal-display')
export class HorizontalDisplay extends LitElement {
  static styles = horizontalDisplaySyles;

  @property() title: string = '';
  @property() items: TmdbDataObj[] = [];

  render() {
    return html`
      <h5>${this.title}</h5>

      ${this.items.map(
        (item) => html`
          <div class="movie-card">
            <a href="details/${getMediaType(item)}/${item.id}">
              <img src=${imgSrc(item.poster_path, 'w185')} alt="" />
            </a>
            <b class="label"> ${getName(item)} (${getYear(item)}) </b>
            <span class="rating">
              ${item.vote_average}
              <star-rating .item=${item}></star-rating>
            </span>
            <mark-favorite size="18" mediaId=${item.id} mediaType=${getMediaType(item)}></mark-favorite>
          </div>
        `
      )}
    `;
  }
}
