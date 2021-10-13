import './movie-card.js';

import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { TmdbMovie } from '../../models/tmdb-movie.js';
import { TmdbTvShow } from '../../models/tmdb-tv-show.js';

@customElement('horizontal-display')
export class HorizontalDisplay extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 20px 8px;
      align-items: end;
      margin: 30px 0;
    }

    h5 {
      grid-column: span 5;
      margin: 2% 0% 0.5%;
    }
  `;

  @property() title: string = '';

  @property() items!: (TmdbMovie | TmdbTvShow)[];

  render() {
    if (!this.items) {
      return html``;
    }

    return html`
      <h5>${this.title}</h5>
      ${this.items.map(item => html`<movie-card .item=${item}></movie-card>`)}
    `;
  }
}
