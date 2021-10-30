import { Router } from '@vaadin/router';
import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { debounce } from 'lodash-es';
import { TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { fetchSearchMulti } from '../tmdb.api.js';
import { searchBarStyles } from './search-bar.styles.js';
import './suggestion-option.js';
import { SuggestionOption } from './suggestion-option.js';

@customElement('search-bar')
export class SearchBar extends LitElement {
  static styles = searchBarStyles;

  @property({ type: String }) value = '';
  @state() options: (TmdbDataObj | string)[] = ['option 1', 'option 2', 'option 3'];
  @state() currentSuggIdx = 0;
  @state() showSuggestions = false;

  private handleInput = debounce(async e => {
    const queryTxt = e.path[0]?.value?.trim();
    this.options = queryTxt ? [queryTxt, ...(await fetchSearchMulti(queryTxt)).splice(0, 12)] : [];
    this.showSuggestions = !!this.options.length;
  }, 400);

  onkeyPress(ev: KeyboardEvent) {
    if (ev.key === 'ArrowDown') {
      this.currentSuggIdx = (this.currentSuggIdx + 1) % this.options.length;
      return;
    }

    if (ev.key === 'ArrowUp') {
      this.currentSuggIdx =
        this.currentSuggIdx === 0
          ? this.options.length - 1
          : (this.currentSuggIdx - 1) % this.options.length;
      return;
    }

    const searchQuery = (ev?.target as any)?.value?.trim();
    if (ev.key === 'Enter' && searchQuery) Router.go(`search-view/${searchQuery}`);
  }

  updated(values: PropertyValues) {
    if (values.has('currentSuggIdx')) {
      const input = this.shadowRoot?.getElementById('search-input') as HTMLInputElement;
      const option = this.shadowRoot?.querySelector('[selected="true"]') as SuggestionOption;
      input.value = option.getName();
    }
  }

  render() {
    return html`
      <div class=${classMap({ show: true /*  this.showSuggestions  */ })}>
        <input
          id="search-input"
          placeholder="Buscar..."
          .value=${this.value}
          @input=${(e: any) => this.handleInput(e)}
          @focus=${() => (this.showSuggestions = !!this.options.length)}
          @blur=${() => (this.showSuggestions = false)}
          @keyup=${this.onkeyPress}
        />

        <div id="suggestions">
          ${repeat(
            this.options,
            opt => (typeof opt === 'string' ? opt : opt.id),
            (opt, idx) => html`
              <suggestion-option
                selected=${idx === this.currentSuggIdx}
                .item=${opt}
              ></suggestion-option>
            `
          )}
        </div>
      </div>
    `;
  }
}
