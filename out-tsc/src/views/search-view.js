import { __decorate } from "tslib";
import '../components/search-bar.js';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import { getRouter } from '../router.js';
import { fetchSearchMovies, fetchSearchTv } from '../tmdb.api.js';
let SearchView = class SearchView extends LitElement {
    constructor() {
        super(...arguments);
        this.location = getRouter().location;
        this.page = 1;
    }
    render() {
        var _a;
        // gets the searched term trough the routing parameters
        const { searchQuery } = (_a = this.location) === null || _a === void 0 ? void 0 : _a.params;
        // this var gets updated everytime the state property 'page' changes performing a new request
        const fetchData = searchQuery
            ? Promise.all([
                fetchSearchMovies(searchQuery, this.page),
                fetchSearchTv(searchQuery, this.page),
            ]).then(([movies, tvShows]) => {
                const interleave = ([x, ...xs], ys = []) => x === undefined ? ys : [x, ...interleave(ys, xs)];
                return interleave(movies, tvShows);
            })
            : Promise.resolve([]);
        // renders a loading spinner until the asynchronous data is resolverd
        return until(fetchData.then(items => html `
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
          `), html `<loading-spinner></loading-spinner>`);
    }
};
SearchView.styles = css `
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
__decorate([
    property({ type: Object })
], SearchView.prototype, "location", void 0);
__decorate([
    state()
], SearchView.prototype, "page", void 0);
SearchView = __decorate([
    customElement('search-view')
], SearchView);
export { SearchView };
//# sourceMappingURL=search-view.js.map