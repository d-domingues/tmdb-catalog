import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getMediaType, getName, isMovie, TmdbDataObj } from '../../models/tmdb-data-obj.js';
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
      background: url(assets/shade-star.svg) repeat-x center left;
    }

    .star-filler {
      width: calc(var(--rating) * 10%);
      height: 100%;
      background: url(assets/gold-star.svg) repeat-x center left;
    }
  `;

  @property() item!: TmdbDataObj;
  @state() rating = 0;

  constructor() {
    super();

    // these events do not need to be removed from the element:
    // since they will only fire on user interaction if the component
    // is not present no events will be fired (no possible leakage)
    this.addEventListener('mousemove', e => this.onMouse(e));
    this.addEventListener('mouseout', () => this.setRating());
    this.addEventListener('click', e => this.confirmRating(e));
  }

  firstUpdated() {
    this.setRating();
  }

  setRating() {
    this.rating = this.item.vote_average;
  }

  onMouse(e: any) {
    this.rating = Math.ceil(
      ((e.clientX - e.target.getBoundingClientRect().left) / this.clientWidth) * 10
    );
  }

  async confirmRating(e: MouseEvent) {
    e.preventDefault();
    const rated = this.rating;
    const modal = await ConfirmationModal.generate();

    const isConfirmed = await modal.show(html`
      <b>Someter el rating</b>
      <p>
        Quieres atribuir a la ${isMovie(this.item) ? 'película' : 'série'}
        <b>${getName(this.item)}</b>
        el rating de ${rated}?
      </p>
    `);

    // if confirmed submits the rated value and feaches the new "vote_average" from DB
    if (isConfirmed) {
      this.rating = await postRating(getMediaType(this.item), this.item.id, rated);
    }
  }

  render() {
    return html`<div class="star-filler" style="--rating: ${this.rating}"></div>`;
  }
}
