import '../components/search-bar.js';

import { RouterLocation } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { getRouter } from '../router.js';
import { fetchSearchMovies, fetchSearchTv } from '../tmdb.api.js';

@customElement('search-view')
export class SearchView extends LitElement {
  static styles = css`
    horizontal-display {
      margin-bottom: 20px;
    }

    button {
      outline: none;
      padding: 6px 30px;
      cursor: pointer;
      background: cornflowerblue;
      border: 2px solid royalblue;
      border-radius: 6px;
      color: white;
    }

    button[disabled] {
      opacity: 0.4;
      pointer-events: none;
      cursor: not-allowed;
    }

    button#forward {
      float: right;
    }
  `;

  @property({ type: Object }) location: RouterLocation = getRouter().location;
  @state() page = 1;

  render() {
    // gets the searched term trough the routing parameters
    const { searchQuery }: any = this.location?.params;

    // this var gets updated everytime the state property 'page' changes performing a new request
    const fetchData: Promise<TmdbDataObj[]> = searchQuery
      ? Promise.all([
          fetchSearchMovies(searchQuery, this.page),
          fetchSearchTv(searchQuery, this.page),
        ]).then(([movies, tvShows]) => {
          const interleave: any = ([x, ...xs]: any[], ys = []) =>
            x === undefined ? ys : [x, ...interleave(ys, xs)];

          return interleave(movies, tvShows);
        })
      : Promise.resolve([]);

    // renders a loading spinner until the asynchronous data is resolverd
    return until(
      fetchData.then(
        items =>
          html`
            <search-bar .value=${searchQuery || ''}></search-bar>
            <horizontal-display
              title=${items.length
                ? 'Resultados de la búsqueda'
                : 'No hay registros para los criterios seleccionados!'}
              .items=${items}
            ></horizontal-display>
            <button id="back" ?disabled=${this.page === 1} @click=${() => (this.page -= 1)}>
              Anterior
            </button>
            <button id="forward" ?disabled=${items.length < 40} @click=${() => (this.page += 1)}>
              Siguiente
            </button>
          `
      ),
      html`<loading-spinner></loading-spinner>`
    );
  }
}
