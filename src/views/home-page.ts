import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../components/carousel-component.js';
import '../components/horizontal-display.js';
import { fechHomePageData } from '../tmdb.api.js';

@customElement('home-page')
export class HomePage extends LitElement {
  static styles = css``;

  @property({ attribute: false })
  tmdb = {
    carousel: [],
    recentMovies: [],
    tvShows: [],
  };

  constructor() {
    super();
    fechHomePageData().then((data: any) => (this.tmdb = data));
  }

  render() {
    return html`
      <carousel-component .slides=${this.tmdb.carousel}></carousel-component>
      <horizontal-display title="Novedades" .items=${this.tmdb.recentMovies}></horizontal-display>
      <horizontal-display title="Series" .items=${this.tmdb.tvShows}></horizontal-display>
    `;
  }
}
