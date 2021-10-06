import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('movie-list')
export class MovieList extends LitElement {
  static styles = css``;

  render() {
    return html` <div>Movie List</div> `;
  }
}
