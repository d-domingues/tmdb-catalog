import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TmdbMovie } from '../../models/tmdb-movie.js';
import { imgPosterSrc } from '../tmdb.api.js';

@customElement('horizontal-display')
export class HorizontalDisplay extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 1%;
      align-items: center;
    }

    h4 {
      grid-column: span 5;
      margin: 2% 0% 0.5%;
    }

    #item {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
    }

    #item:hover {
      transform: scale(1.02);
    }
  `;

  @property() title: string = '';

  @property() items: TmdbMovie[] = [];

  render() {
    return html`
      <h4>${this.title}</h4>
      ${this.items.map(i => html` <img id="item" src=${imgPosterSrc(i)} alt="movie poster" />`)}
    `;
  }
}
