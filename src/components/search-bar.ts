import { Router } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { debounce, DebouncedFunc } from 'lodash-es';
import { TmdbMovie } from '../../models/tmdb-movie.js';
import { TmdbTvShow } from '../../models/tmdb-tv-show.js';
import { fetchSearchMovies } from '../tmdb.api.js';
import './suggestion-option.js';

@customElement('search-bar')
export class SearchBar extends LitElement {
  static styles = css`
    input#search-input {
      box-sizing: border-box;
      border: 2px solid #333333;
      border-radius: 20px;
      font-size: 14px;
      background-image: url(assets/search-icon.svg);
      background-position: 8px center;
      background-repeat: no-repeat;
      background-size: 14px;
      padding: 8px;
      outline: none;
      text-indent: 24px;
      margin: 10px 0;
    }

    @media only screen and (min-width: 601px) {
      input#search-input {
        transition: 400ms ease-in-out;
        width: 120px;
        opacity: 0.4;
      }

      input#search-input:focus {
        width: 400px;
        opacity: 1;
      }
    }

    @media only screen and (max-width: 600px) {
      input#search-input {
        width: 100%;
      }
    }

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

  @property({ type: String }) value = '';
  @state() results: (TmdbMovie | TmdbTvShow)[] = [];
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
              <a href="movie-details/${item.id}">
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
