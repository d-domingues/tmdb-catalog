import '../components/carousel-component.js';
import '../components/horizontal-display.js';
import '../components/loading-spinner.js';
import '../components/search-bar.js';

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { ToastUi } from '../components/toast-ui.js';
import { fechHomePageData } from '../tmdb.api.js';

@customElement('home-page')
export class HomePage extends LitElement {
  static styles = css`
    search-bar {
      position: absolute;
      z-index: 1;
      top: 12px;
      left: 10px;
    }

    @media only screen and (max-width: 600px) {
      search-bar {
        position: initial;
        display: block;
        margin-bottom: 8px;
      }
    }
  `;

  presentToast = () => {
    ToastUi.present('example of a toast');
  };

  render() {
    return until(
      fechHomePageData().then(
        ({ carousel, recentMovies, tvShows }) => html`
          <search-bar></search-bar>
          <carousel-component .slides=${carousel}></carousel-component>
          <button @click=${this.presentToast}>Present Toast</button>
          <horizontal-display title="Novedades" .items=${recentMovies}></horizontal-display>
          <horizontal-display title="Series" .items=${tvShows}></horizontal-display>
        `
      ),
      html`<loading-spinner></loading-spinner>`
    );
  }
}
