import { __decorate } from "tslib";
import './suggestion-option.js';
import { Router } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { debounce } from 'lodash-es';
import { isMovie } from '../../models/tmdb-data-obj.js';
import { fetchSearchMulti } from '../tmdb.api.js';
import { searchBarStyles } from './search-bar.styles.js';
let SearchBar = class SearchBar extends LitElement {
    constructor() {
        super(...arguments);
        this.value = '';
        this.results = [];
        this.showSuggestions = false;
        this.currentSuggIdx = 0;
    }
    firstUpdated() {
        this.handleInput = debounce(async (e) => {
            var _a, _b;
            const queryTxt = (_b = (_a = e.path[0]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.trim();
            this.results = queryTxt ? (await fetchSearchMulti(queryTxt)).splice(0, 12) : [];
        }, 400);
    }
    onkeyPress(ev) {
        var _a, _b;
        if (ev.key === 'ArrowDown') {
            this.currentSuggIdx = (this.currentSuggIdx + 1) % this.results.length;
            return;
        }
        if (ev.key === 'ArrowUp') {
            this.currentSuggIdx =
                this.currentSuggIdx === 0
                    ? this.results.length - 1
                    : (this.currentSuggIdx - 1) % this.results.length;
            return;
        }
        const searchQuery = (_b = (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.trim();
        if (ev.key === 'Enter' && searchQuery) {
            Router.go(`search-view/${searchQuery}`);
        }
    }
    render() {
        return html `
      <input
        id="search-input"
        placeholder="Buscar..."
        .value=${this.value}
        @input=${(e) => this.handleInput(e)}
        @focus=${() => (this.showSuggestions = true)}
        @blur=${() => (this.showSuggestions = false)}
        @keyup=${this.onkeyPress}
      />

      <div
        id="suggestions"
        class=${classMap({ show: this.showSuggestions && this.results.length })}
      >
        ${repeat(this.results, item => item.id, (item, idx) => html `
              <a href="details/${isMovie(item) ? 'movie' : 'tv'}/${item.id}">
                <suggestion-option
                  selected=${idx === this.currentSuggIdx}
                  .item=${item}
                ></suggestion-option>
              </a>
            `)}
      </div>
    `;
    }
};
SearchBar.styles = searchBarStyles;
__decorate([
    property({ type: String })
], SearchBar.prototype, "value", void 0);
__decorate([
    state()
], SearchBar.prototype, "results", void 0);
__decorate([
    state()
], SearchBar.prototype, "showSuggestions", void 0);
__decorate([
    state()
], SearchBar.prototype, "currentSuggIdx", void 0);
__decorate([
    query('#search-input')
], SearchBar.prototype, "searchInput", void 0);
SearchBar = __decorate([
    customElement('search-bar')
], SearchBar);
export { SearchBar };
//# sourceMappingURL=search-bar.js.map