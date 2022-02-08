import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getMediaType, getName, isMovie, TmdbDataObj } from '../models/tmdb-data-obj.js';
import { postRating } from '../tmdb.api.js';
import { ModalUi } from './modal-ui.js';
import { ToastUi } from './toast-ui.js';

@customElement('star-rating')
export class StarRating extends LitElement {
  static styles = css`
    :host {
      height: 20px;
      width: 90px;
      cursor: pointer;
      display: block;
      background: url(/shade-star.svg) repeat-x center left;
    }

    .star-filler {
      width: calc(var(--rating) * 10%);
      height: 100%;
      background: url(/gold-star.svg) repeat-x center left;
    }
  `;

  @property({ type: Object }) item!: TmdbDataObj;

  private set rating(value: number) {
    this.item.vote_average = value;
    this.requestUpdate();
  }

  private get rating() {
    return this.item.vote_average;
  }

  constructor() {
    super();

    let origValue = 0;
    let resetOrigValue = true;

    // these events do not need to be removed from the element:
    // since they will only fire on user interaction if the component
    // is not present no events will be fired (no possible leakage)
    this.addEventListener('mouseover', () => (origValue = this.rating));
    this.addEventListener('mouseout', () => resetOrigValue && (this.rating = origValue));
    this.addEventListener('mousemove', (e) => (this.rating = this.claculateRating(e)));
    this.addEventListener('click', async (e) => {
      resetOrigValue = false;
      const confirmed = await this.confirmRating(e);
      resetOrigValue = true;
      // if confirmed submits the rated value and feaches the new "vote_average" from DB
      if (confirmed) {
        const newVoteAvg = await this.submiteRating();
        this.rating = newVoteAvg ?? origValue;
        return;
      }

      this.rating = origValue;
    });
  }

  claculateRating(e: any) {
    return Math.ceil(((e.clientX - this.getBoundingClientRect().left) / this.clientWidth) * 10);
  }

  confirmRating(e: MouseEvent) {
    e.preventDefault();

    return ModalUi.present(html`
      <b>Someter el rating</b>
      <p>
        Quieres atribuir a la ${isMovie(this.item) ? 'película' : 'série'}
        <b>${getName(this.item)}</b>
        el rating de ${this.rating}?
      </p>
    `);
  }

  async submiteRating() {
    try {
      const mediaType = getMediaType(this.item);
      const newRating = await postRating(mediaType, this.item.id, this.rating);
      ToastUi.present('Rating sometido con éxito!');
      return newRating;
    } catch {
      ToastUi.present('Erro al intentar someter el Rating!', 'E');
      return null;
    }
  }

  render() {
    return html`<div class="star-filler" style="--rating: ${this.rating}"></div>`;
  }
}
