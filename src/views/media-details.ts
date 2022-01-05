import '../components/loading-spinner.js';
import '../components/mark-favorite.js';

import { RouterLocation } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { ToastUi } from '../components/toast-ui.js';
import { imgSrc } from '../directives/img-directive.js';
import { router } from '../main.js';
import {
  cast,
  certification,
  director,
  getName,
  getYear,
  productionCountries,
  runtimeInHHMM,
  TmdbDataObj,
} from '../models/tmdb-data-obj.js';
import { getDetails } from '../tmdb.api.js';
import styles from './media-details.styles.js';

@customElement('media-details')
export class MediaDetails extends LitElement {
  static styles = styles;

  @property() location: RouterLocation = router.location;
  @query('#cast-scroller') castScroller!: HTMLDivElement;

  moveScroller = (to: number) => this.castScroller.scrollBy({ left: this.castScroller.offsetWidth * to });

  share(details: TmdbDataObj) {
    navigator.share({
      title: 'Movie Catalog',
      text: `Details for ${getName(details)}`,
      url: this.location.getUrl(),
    });
  }

  render() {
    const { type, id }: any = this.location?.params;

    return until(
      getDetails(type, id)
        .then(
          (details) => html`
            <div id="stack">
              <img id="backdrop-img" src=${imgSrc(details.backdrop_path)} alt="" />
              <!-- TITLE -->
              <span id="title">
                <b>${getName(details)}</b>
                <div>${getYear(details) + runtimeInHHMM(details) + certification(details)}</div>
              </span>
              <!-- RATING -->
              <span id="rating">
                <div style="text-align: right">${details.vote_average}</div>
                <star-rating .item=${details}></star-rating>
              </span>
            </div>
            <div id="details">
              <!-- DIRECTOR -->
              <div>
                <b>Director</b>
                ${director(details)}
              </div>
              <!-- COUNTRY -->
              <div>
                <b>País</b>
                ${productionCountries(details)}
              </div>
              <!-- GENRES -->
              <div id="genres">${details.genres.map((g) => html`<span class="genre">${g.name}</span>`)}</div>
              <!-- MARK FAVORITE BTN -->
              <mark-favorite mediaId=${id} mediaType=${type}></mark-favorite>
              <img height="25" src="/share.svg" alt="SHARE" @click=${this.share} @keyup=${this.share} />
            </div>
            <!-- OVERVIEW -->
            <h4>Sinopsis</h4>
            <span id="overview">${details.overview}</span>
            <!-- CAST -->
            <h4>Reparto</h4>
            <div style="display: flex">
              <button @click=${() => this.moveScroller(-1)}>&#60;</button>
              <div id="cast-scroller">
                ${cast(details).map(
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
        )
        .catch(() => ToastUi.present('No se han podido obtener los datos!')),
      html`<loading-spinner></loading-spinner>`
    );
  }
}
