import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isMovie, TmdbMovie } from '../../models/tmdb-movie.js';
import { TmdbTvShow } from '../../models/tmdb-tv-show.js';
import { imgPosterSrc } from '../tmdb.api';

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

  @property() item!: TmdbMovie | TmdbTvShow;

  starTmpl = (item: any, idx: number) => {
    if (item.vote_average - (idx + 1) * 2 >= 0) {
      return html`<img class="star" src="assets/gold-star.svg" alt="" />`;
    }

    if (item.vote_average - ((idx + 1) * 2 - 1) >= 0) {
      return html`<img class="star" src="assets/half-star.svg" alt="" />`;
    }

    return html`<img class="star" src="assets/shade-star.svg" alt="" />`;
  };

  getDate() {
    const strDate = isMovie(this.item) ? this.item.release_date : this.item.first_air_date;
    return strDate ? `(${strDate.split('-')[0]})` : '';
  }

  render() {
    if (!this.item) {
      return '';
    }

    return html`
      <img class="movie-img" src=${imgPosterSrc(this.item, 'w45')} alt="" />
      <span> ${isMovie(this.item) ? this.item.title : this.item.name} ${this.getDate()} </span>
      <span>
        ${this.item.vote_average} ${Array.from({ length: 5 }).map((_, starIdx) => this.starTmpl(this.item, starIdx))}
      </span>
    `;
  }
}
