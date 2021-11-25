import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { MediaType } from '../../models/tmdb-data-obj.js';
import { getAccountStates, markAsFavorite } from '../tmdb.api.js';

@customElement('mark-favorite')
export class MarkFavorite extends LitElement {
  @property({ type: String }) mediaType!: MediaType;
  @property({ type: Number }) mediaId!: number;
  @property({ type: Number }) size = 25;

  @state() favorite = false;

  async onClick(ev: MouseEvent) {
    ev.preventDefault();

    try {
      this.favorite = !this.favorite;
      await markAsFavorite(this.mediaType, this.mediaId, this.favorite);
    } catch (error) {
      // if fails the favorite state returns to the original value
      this.favorite = !this.favorite;
    }
  }

  async firstUpdated() {
    if (this.mediaType && this.mediaId) {
      this.favorite = (await getAccountStates(this.mediaType, this.mediaId)).favorite;
    }
  }

  render() {
    return html`
      <img
        height=${this.size}
        style="cursor:pointer"
        src="assets/${this.favorite ? 'red' : 'shade'}-heart.svg"
        alt=""
        @click=${this.onClick}
        @keyup=${this.onClick}
      />
    `;
  }
}
