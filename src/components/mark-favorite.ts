import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { markAsFavorite } from '../tmdb.api';

@customElement('mark-favorite')
export class MarkFavorite extends LitElement {
  @property({ type: Boolean }) favorite = false;
  @property({ type: String }) mediaType!: 'movie' | 'tv';
  @property({ type: Number }) mediaId!: number;

  async onClick() {
    try {
      this.favorite = !this.favorite;
      await markAsFavorite(this.mediaType, this.mediaId, this.favorite);
    } catch (error) {
      // if fails the favorite state returns to the original value
      this.favorite = !this.favorite;
    }
  }

  render() {
    return html`
      <img
        height="25"
        style="cursor:pointer"
        src="assets/${this.favorite ? 'red' : 'shade'}-heart.svg"
        alt=""
        @click=${this.onClick}
        @keypress=${this.onClick}
      />
    `;
  }
}
