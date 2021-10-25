import './star-rating.js';

import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isMovie, TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { imgSrc } from '../directives/img-directive.js';

@customElement('suggestion-option')
export class SuggestionOption extends LitElement {
  static styles = css`
    :host {
      background: white;
      font-size: 14px;
      white-space: nowrap;
      width: 100%;
      display: grid;
      grid-template-columns: min-content auto;
      column-gap: 6px;
    }

    .movie-img {
      height: 40px;
      grid-row: 1 / 3;
    }

    .star {
      height: 14px;
    }
  `;

  @property() item!: TmdbDataObj;

  getDate() {
    const strDate = isMovie(this.item) ? this.item.release_date : this.item.first_air_date;
    return strDate ? `(${strDate.split('-')[0]})` : '';
  }

  render() {
    return html`
      <img src="${imgSrc(this.item.poster_path, 'w45')} " alt="" />
      <span> ${isMovie(this.item) ? this.item.title : this.item.name} ${this.getDate()} </span>
      <star-rating rating=${this.item.vote_average}></star-rating>
    `;
  }
}
