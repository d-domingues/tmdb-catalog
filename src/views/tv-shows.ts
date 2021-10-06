import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tv-shows')
export class TvShows extends LitElement {
  static styles = css``;

  render() {
    return html` <div>TV Shows</div> `;
  }
}
