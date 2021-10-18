import './suggestion-option.js';

import { Router } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { debounce, DebouncedFunc } from 'lodash-es';

import { isMovie, TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { fetchSearchMovies } from '../tmdb.api.js';
import { searchBarStyles } from './search-bar.styles.js';

@customElement('search-bar')
export class SearchBar extends LitElement {
  static styles = searchBarStyles;

  @property({ type: String }) value = '';
  @state() results: TmdbDataObj[] = [];
  @state() showSuggestions = false;
  @state() currentSuggIdx = 0;
  @query('#search-input') searchInput!: HTMLInputElement;

  private handleInput!: DebouncedFunc<(e: any) => Promise<void>>;

  firstUpdated() {
    this.handleInput = debounce(async e => {
      const queryTxt = e.path[0]?.value?.trim();
      this.results = queryTxt ? (await fetchSearchMovies(queryTxt)).splice(0, 12) : [];
    }, 400);
  }

  onkeyPress(ev: KeyboardEvent) {
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

    const searchQuery = this.searchInput?.value?.trim();
    if (ev.key === 'Enter' && searchQuery) {
      Router.go(`search-view/${searchQuery}`);
    }
  }

  render() {
    return html`
      <input
        id="search-input"
        placeholder="Buscar..."
        .value=${this.value}
        @input=${(e: any) => this.handleInput(e)}
        @focus=${() => (this.showSuggestions = true)}
        @blur=${() => (this.showSuggestions = false)}
        @keydown=${this.onkeyPress}
      />

      <div
        id="suggestions"
        class=${classMap({ show: this.showSuggestions && this.results.length })}
      >
        ${repeat(
          this.results,
          item => item.id,
          (item, idx) =>
            html`
              <a href="details/${isMovie(item) ? 'movie' : 'tv'}/${item.id}">
                <suggestion-option
                  selected=${idx === this.currentSuggIdx}
                  .item=${item}
                ></suggestion-option>
              </a>
            `
        )}
      </div>
    `;
  }
}
