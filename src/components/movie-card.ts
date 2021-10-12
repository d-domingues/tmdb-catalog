import './star-rating.js';

import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isMovie, TmdbMovie } from '../../models/tmdb-movie.js';
import { TmdbTvShow } from '../../models/tmdb-tv-show.js';
import { imgPosterSrc } from '../tmdb.api.js';

@customElement('movie-card')
export class MovieCard extends LitElement {
  static styles = css`
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
    }

    img:hover {
      transform: scale(1.02);
    }
  `;

  @property() item!: TmdbMovie | TmdbTvShow;

  getDate() {
    const strDate = isMovie(this.item) ? this.item.release_date : this.item.first_air_date;
    return strDate ? `(${strDate.split('-')[0]})` : '';
  }

  render() {
    if (!this.item) {
      return '';
    }

    return html`
      <img src=${imgPosterSrc(this.item, 'w300')} alt="" />
      <star-rating rating=${this.item.vote_average}></star-rating>
    `;
  }
}
