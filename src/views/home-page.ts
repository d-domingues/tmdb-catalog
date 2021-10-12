import '../components/carousel-component.js';
import '../components/horizontal-display.js';
import '../components/typeahead-input.js';

import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { HomePageVM } from '../../models/home-page-vm.js';
import { fechHomePageData } from '../tmdb.api.js';

@customElement('home-page')
export class HomePage extends LitElement {
  static styles = css`
    typeahead-input {
      z-index: 1;
      position: absolute;
      top: 58px;
      margin: 10px;
      transition: 400ms ease-in-out;
      width: 120px;
      opacity: 0.4;
    }

    typeahead-input:focus-within {
      width: 350px;
      opacity: 1;
    }

    @media only screen and (max-width: 600px) {
      typeahead-input {
        position: inherit;
        margin: 0;
      }
    }
  `;

  @property({ attribute: false })
  tmdb: HomePageVM = {
    carousel: [],
    recentMovies: [],
    tvShows: [],
  };

  constructor() {
    super();
    fechHomePageData().then((data: HomePageVM) => (this.tmdb = data));
  }

  render() {
    return html`
      <typeahead-input></typeahead-input>
      <carousel-component .slides=${this.tmdb.carousel}></carousel-component>
      <horizontal-display title="Novedades" .items=${this.tmdb.recentMovies}></horizontal-display>
      <horizontal-display title="Series" .items=${this.tmdb.tvShows}></horizontal-display>
    `;
  }
}
