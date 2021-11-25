import '../components/loading-spinner.js';
import '../components/mark-favorite.js';

import { RouterLocation } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { getYear, isMovie, TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { imgSrc } from '../directives/img-directive.js';
import { getRouter } from '../router.js';
import { getDetails } from '../tmdb.api.js';
import styles from './media-details.styles.js';

@customElement('media-details')
export class MediaDetails extends LitElement {
  static styles = styles;

  @property({ type: Object }) location: RouterLocation = getRouter().location;
  @query('#cast-scroller') castScroller!: HTMLDivElement;

  director = (details: TmdbDataObj) =>
    details?.credits?.crew?.find(({ job }) => job === 'Director')?.name ?? '-';

  productionCountries = (details: TmdbDataObj) =>
    details?.production_countries?.map(p => p.name).join(', ') ?? '-';

  genres = (details: TmdbDataObj) =>
    details?.genres?.map(g => html`<span class="genre">${g.name}</span>`);

  cast = (details: TmdbDataObj) =>
    details?.credits?.cast?.sort((a, b) => b.popularity - a.popularity) ?? [];

  moveScroller = (to: number) =>
    this.castScroller.scrollBy({ left: this.castScroller.offsetWidth * to });

  runtimeInHHMM = (details: TmdbDataObj) => {
    const value =
      isMovie(details) &&
      !Number.isNaN(details.runtime) &&
      `${Math.floor(details.runtime / 60)}:${(details.runtime % 60)
        ?.toString()
        ?.concat('0')
        ?.substr(0, 2)
        ?.trim()}`;

    return value ? ` | ${value}` : '';
  };

  certification = (details: TmdbDataObj) => {
    const value =
      isMovie(details) &&
      `${details?.release_dates?.results
        ?.find(({ iso_3166_1 }) => iso_3166_1 === 'ES')
        ?.release_dates?.at(0)
        ?.certification?.trim()}`;

    return value ? ` | ${value}` : '';
  };

  share(details: TmdbDataObj) {
    navigator.share({
      title: 'Movie Catalog',
      text: `Details for ${isMovie(details) ? details.title : details.name}`,
      url: this.location.getUrl(),
    });
  }

  render() {
    const { type, id }: any = this.location?.params;

    return until(
      getDetails(type, id).then(
        details => html`
          <div id="stack">
            <img id="backdrop-img" src=${imgSrc(details.backdrop_path)} alt="" />
            <!-- TITLE -->
            <span id="title">
              <b>${isMovie(details) ? details.title : details.name}</b>
              <div>
                ${getYear(details) + this.runtimeInHHMM(details) + this.certification(details)}
              </div>
            </span>
            <!-- RATING -->
            <span id="rating">
              <div style="text-align: right">${details.vote_average}</div>
              <star-rating size="16" rating=${details.vote_average}></star-rating>
            </span>
          </div>
          <div id="details">
            <!-- DIRECTOR -->
            <div>
              <b>Director</b>
              ${this.director(details)}
            </div>
            <!-- COUNTRY -->
            <div>
              <b>País</b>
              ${this.productionCountries(details)}
            </div>
            <!-- GENRES -->
            <div id="genres">${this.genres(details)}</div>
            <!-- MARK FAVORITE BTN -->
            <mark-favorite mediaId=${id} mediaType=${type}></mark-favorite>
            <img
              height="25"
              src="assets/share.svg"
              alt="SHARE"
              @click=${this.share}
              @keyup=${this.share}
            />
          </div>
          <!-- OVERVIEW -->
          <h4>Sinopsis</h4>
          <span id="overview">${details.overview}</span>
          <!-- CAST -->
          <h4>Reparto</h4>
          <div style="display: flex">
            <button @click=${() => this.moveScroller(-1)}>&#60;</button>
            <div id="cast-scroller">
              ${this.cast(details).map(
                ({ profile_path, name, character }) => html`
                  <img src=${imgSrc(profile_path, 'w92')} alt="" />
                  <b>${name}</b>
                  <span>${character}</span>
                `
              )}
            </div>
            <button @click=${() => this.moveScroller(1)}>&#62;</button>
          </div>
        `
      ),
      html`<loading-spinner></loading-spinner>`
    );
  }
}
