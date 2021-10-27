import '../components/horizontal-display.js';

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import { getFavorites } from '../tmdb.api';

@customElement('my-list')
export class MyList extends LitElement {
  static styles = css``;

  render() {
    return until(
      getFavorites().then(
        ({ movie, tv }) => html`
          <horizontal-display title="Peliculas" .items=${movie}></horizontal-display>
          <horizontal-display title="Series" .items=${tv}></horizontal-display>
        `
      ),
      html`<loading-spinner></loading-spinner>`
    );
  }
}
