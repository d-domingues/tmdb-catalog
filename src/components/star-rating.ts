import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MediaType } from '../../models/tmdb-data-obj.js';
import { postRating } from '../tmdb.api.js';
import './confirmation-modal.js';
import { ConfirmationModal } from './confirmation-modal.js';

@customElement('star-rating')
export class StarRating extends LitElement {
  static styles = css`
    :host {
      height: 20px;
      width: 90px;
      cursor: pointer;
      display: block;
      background: url('assets/shade-star.svg') repeat-x center left;
    }

    .star-filler {
      width: calc(var(--rating) * 10%);
      height: 100%;
      background: url('assets/gold-star.svg') repeat-x center left;
    }
  `;

  @property({ type: Number }) rating = 0;
  @property() mediaType!: MediaType;
  @property() mediaId!: number;

  onMouse!: {
    (arg0: boolean, arg1: MouseEvent): any;
    (calc: boolean, e?: any): void;
  };

  constructor() {
    super();

    // these events do not need to be removed from the element:
    // since they will only fire on user interaction if the component
    // is not present no events will be fired (no possible leakage)
    this.addEventListener('mousemove', e => this.onMouse(true, e));
    this.addEventListener('mouseout', e => this.onMouse(false, e));
    this.addEventListener('click', () => this.confirmRating());
  }

  firstUpdated() {
    this.onMouse = (() => {
      const original = this.rating;

      return (calc: boolean, e?: any) => {
        this.rating = calc
          ? Math.ceil(((e.clientX - e.target.getBoundingClientRect().left) / this.clientWidth) * 10)
          : original;
      };
    })();
  }

  async confirmRating() {
    const rated = this.rating;
    const modal = await ConfirmationModal.generate();
    const resp = await modal.show(`Someter el rating: ${rated}?`);
    return resp && postRating(this.mediaType, this.mediaId, rated);
  }

  render() {
    return html`<div class="star-filler" style="--rating: ${this.rating}"></div>`;
  }
}
