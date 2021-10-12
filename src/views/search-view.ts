import '../components/horizontal-display.js';

import { RouterLocation } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { TmdbMovie } from '../../models/tmdb-movie.js';
import { TmdbTvShow } from '../../models/tmdb-tv-show.js';
import { getRouter } from '../router.js';
import { fetchSearchMovies } from '../tmdb.api.js';

@customElement('search-view')
export class SearchView extends LitElement {
  static styles = css`
    button {
      outline: none;
      padding: 10px 40px;
      cursor: pointer;
      background: lightskyblue;
      border: solid 2px cornflowerblue;
      border-radius: 6px;
    }

    button:nth-child(2) {
      float: right;
    }
  `;

  @property({ type: Object }) location: RouterLocation = getRouter().location;
  @state() results: (TmdbMovie | TmdbTvShow)[] = [];

  async firstUpdated() {
    this.results = await fetchSearchMovies(this.location?.params?.searchQuery as string);
  }

  render() {
    return html`
      <horizontal-display title="Resultados de la búsqueda" .items=${this.results}></horizontal-display>

      <button>Anterior</button>
      <button>Siguiente</button>
    `;
  }
}
