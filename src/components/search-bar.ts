import { Router } from '@vaadin/router';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { debounce, DebouncedFunc } from 'lodash-es';

@customElement('search-bar')
export class SearchBar extends LitElement {
  static styles = css`
    input#search-input {
      width: 100%;
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
    }

    input#search-input:focus {
      border-bottom: none;
    }
  `;

  @property() debounce = 300;
  @query('#search-input') searchInput!: HTMLInputElement;
  handleInput!: DebouncedFunc<(e: any) => Promise<void>>;

  firstUpdated() {
    this.handleInput = debounce(async e => {
      const detail = e.path[0].value;
      const event = new CustomEvent('onQuery', { detail, bubbles: true, composed: true, cancelable: true });
      this.dispatchEvent(event);

      if (event.defaultPrevented) {
        e.preventDefault();
      }
    }, this.debounce);
  }

  onSearch(ev: KeyboardEvent) {
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
        @input=${(e: any) => this.handleInput(e)}
        @keyup=${this.onSearch}
      />
    `;
  }
}
