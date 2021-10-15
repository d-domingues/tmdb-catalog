import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { isMovie, TmdbMovie } from '../../models/tmdb-movie.js';
import { TmdbTvShow } from '../../models/tmdb-tv-show.js';
import { imgSrc } from '../directives/img-directive.js';
import './star-rating.js';

@customElement('movie-card')
export class MovieCard extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: end;

      --label-height: 45px;
      --rating-height: 26px;
    }

    a {
      height: 100%;
    }

    a img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      background: black;
      box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px,
        rgb(0 0 0 / 20%) 0px -3px 0px inset;
    }

    img:hover {
      transform: scale(1.02);
    }

    b.label {
      height: var(--label-height);
      display: flex;
      font-size: 14px;
      word-break: break-word;
      line-height: 16px;
      letter-spacing: -0.6px;
      align-items: center;
    }

    star-rating {
      height: var(--rating-height);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    /* Responsive for mobile devices */
    @media only screen and (max-width: 600px) {
      b.label {
        font-size: 10px;
        line-height: 10px;
      }
    }
  `;

  @property({ type: Object }) item!: TmdbMovie | TmdbTvShow;

  getDate() {
    const strDate = isMovie(this.item) ? this.item.release_date : this.item.first_air_date;
    return strDate ? `(${strDate.split('-')[0]})` : '';
  }

  render() {
    return html`
      <a href="movie-details/${this.item.id}">
        <img src=${imgSrc(this.item.poster_path, 'w300')} alt="" />
      </a>
      <b class="label">
        ${(isMovie(this.item) ? this.item.title : this.item.name).substr(0, 40)} ${this.getDate()}
      </b>
      <star-rating rating=${this.item.vote_average}></star-rating>
    `;
  }
}
