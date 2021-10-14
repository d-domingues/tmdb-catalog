import './search-bar.js';
import './suggestion-option.js';

import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';

import { TmdbMovie } from '../../models/tmdb-movie.js';
import { TmdbTvShow } from '../../models/tmdb-tv-show.js';
import { fetchSearchMovies } from '../tmdb.api';

@customElement('typeahead-input')
export class TypeaheadInput extends LitElement {
  static styles = css`
    #suggestions {
      position: absolute;
      z-index: 20;
      overflow: hidden;
      width: calc(100% - 4px);
      transition: 400ms ease-in-out;
      max-height: 0;
    }

    #suggestions.show {
      border: 2px solid #333333;
      border-top: none;
      max-height: 400px;
    }

    #suggestions suggestion-option[selected='true'] {
      background: lightblue;
    }

    .star {
      width: 20px;
      height: 20px;
    }
  `;

  @property() value = '';
  @state() results: (TmdbMovie | TmdbTvShow)[] = [];
  @state() showSuggestions = false;
  @state() currentSuggIdx = 0;
  @query('#search-input') searchInput!: HTMLInputElement;

  async handleInput(ev: CustomEvent) {
    if (!ev.detail.trim()) {
      this.results = [];
      return;
    }

    this.results = (await fetchSearchMovies(ev.detail)).splice(0, 12);
  }

  onNavigateOpts(ev: KeyboardEvent) {
    if (ev.key === 'ArrowDown') {
      this.currentSuggIdx = (this.currentSuggIdx + 1) % this.results.length;
    }

    if (ev.key === 'ArrowUp') {
      this.currentSuggIdx =
        this.currentSuggIdx === 0
          ? this.results.length - 1
          : (this.currentSuggIdx - 1) % this.results.length;
    }
  }

  render() {
    return html`
      <search-bar
        debounce="300"
        value=${this.value}
        @focus=${() => (this.showSuggestions = true)}
        @blur=${() => (this.showSuggestions = false)}
        @onQuery=${this.handleInput}
        @keydown=${this.onNavigateOpts}
      ></search-bar>

      <div
        id="suggestions"
        class=${classMap({ show: this.showSuggestions && this.results.length })}
      >
        ${repeat(
          this.results,
          item => item.id,
          (item, idx) =>
            html`
              <suggestion-option
                selected=${idx === this.currentSuggIdx}
                .item=${item}
              ></suggestion-option>
            `
        )}
      </div>
    `;
  }
}
