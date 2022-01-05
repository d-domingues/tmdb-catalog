import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { debounce } from 'lodash-es';
import { TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { getRecentSearches } from '../storage.js';
import { fetchSearchMulti } from '../tmdb.api.js';
import { searchBarStyles } from './search-bar.styles.js';
import './suggestion-options.js';
import { SuggestionOptions } from './suggestion-options.js';
import { presentToast } from './tosat-bar.js';

@customElement('search-bar')
export class SearchBar extends LitElement {
  static styles = searchBarStyles;

  @state() options: (TmdbDataObj | string)[] = [];
  @state() currentIdx = 0;
  @state() showSuggestions = false;

  @query('#search-input') inputEl!: HTMLInputElement;
  @query('suggestion-options') opts!: SuggestionOptions;

  private handleInput = debounce(async () => {
    try {
      const queryTxt = this.inputEl?.value?.trim();
      this.options = queryTxt
        ? [queryTxt, ...(await fetchSearchMulti(queryTxt)).splice(0, 12)].splice(0, 8)
        : [];
      this.currentIdx = 0;
      this.showSuggestions = !!this.options.length;
    } catch {
      this.options = [];
      presentToast('No se ha podido obtener los datos!');
    }
  }, 400);

  onkeyPress(ev: KeyboardEvent) {
    if (ev.key === 'ArrowDown') {
      this.currentIdx = (this.currentIdx + 1) % this.options.length;
      return;
    }

    if (ev.key === 'ArrowUp') {
      this.currentIdx = this.currentIdx
        ? (this.currentIdx - 1) % this.options.length
        : this.options.length - 1;
      return;
    }

    if (ev.key === 'Enter') {
      this.opts.getSelectedOptionLink()?.click();
    }
  }

  onInputFocus() {
    if (!this.options.length) {
      this.options = getRecentSearches();
    }
    this.showSuggestions = !!this.options.length;
  }

  render() {
    return html`
      <input
        id="search-input"
        class=${this.showSuggestions && 'show'}
        placeholder="Buscar..."
        @input=${this.handleInput}
        @focus=${this.onInputFocus}
        @blur=${() => (this.showSuggestions = true)}
        @keyup=${this.onkeyPress}
      />

      <suggestion-options
        class=${this.showSuggestions && 'show'}
        .options=${this.options}
        currentIdx=${this.currentIdx}
        @selectionChange=${(e: any) => (this.inputEl.value = e.detail)}
      ></suggestion-options>
    `;
  }
}
