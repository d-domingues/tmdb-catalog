import '../components/loading-spinner.js';

import { RouterLocation } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { TmdbMovie } from '../../models/tmdb-movie.js';
import { imgSrc } from '../directives/img-directive.js';
import { getRouter } from '../router.js';
import { getMovie } from '../tmdb.api.js';

@customElement('movie-details')
export class MovieDetails extends LitElement {
  static styles = css`
    .backdrop-img {
      width: 100%;
      box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px,
        rgb(0 0 0 / 20%) 0px -3px 0px inset;
    }

    .cast-carousel {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(3, auto);
      grid-auto-flow: column;
      gap: 4px 8px;
      text-align: center;
      align-items: center;
    }

    .cast-carousel img {
      width: 90px;
      height: 100px;
      border-radius: 44%;
      margin: auto;
    }

    .cast-carousel b {
      font-size: 14px;
    }

    .cast-carousel span {
      font-size: 14px;
      color: gray;
    }
  `;

  @property({ type: Object }) location: RouterLocation = getRouter().location;
  @state() carouselPage = 0;

  director = (details: TmdbMovie) =>
    details?.credits?.crew?.find(({ job }) => job === 'Director')?.name ?? '-';

  productionCountries = (details: TmdbMovie) =>
    details?.production_countries?.map(p => p.name).join(', ') ?? '-';

  genres = (details: TmdbMovie) =>
    details?.genres?.map(g => html` <span class="genre">${g.name}</span> `);

  carousel = (details: TmdbMovie) =>
    details?.credits?.cast?.sort((a, b) => b.popularity - a.popularity).splice(0, 6) ?? [];

  render() {
    const { id }: any = this.location?.params;

    return until(
      getMovie(id).then(
        details => html`
          <img class="backdrop-img" src=${imgSrc(details.backdrop_path)} alt="" />
          <!-- DIRECTOR -->
          <h4>Director</h4>
          <p>${this.director(details)}</p>
          <!-- COUNTRY -->
          <h4>País</h4>
          <p>${this.productionCountries(details)}</p>
          <!-- GENRES -->
          ${this.genres(details)}
          <!-- OVERVIEW -->
          <h4>Sinopsis</h4>
          <p>${details.overview}</p>
          <!-- CAST CAROUSEL -->
          <h4>Reparto</h4>
          <div class="cast-carousel">
            ${this.carousel(details).map(
              ({ profile_path, name, character }) => html`
                <img src=${imgSrc(profile_path, 'w92')} alt="" />
                <b>${name}</b>
                <span>${character}</span>
              `
            )}
          </div>
        `
      ),
      html`<loading-spinner></loading-spinner>`
    );
  }
}
