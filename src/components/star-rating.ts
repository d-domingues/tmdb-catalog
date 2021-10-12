import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('star-rating')
export class StarRating extends LitElement {
  static styles = css``;

  @property() rating = 0;

  starTmpl = (idx: number) => {
    if (this.rating - (idx + 1) * 2 >= 0) {
      return html`<img class="star" src="assets/gold-star.svg" alt="" />`;
    }

    if (this.rating - ((idx + 1) * 2 - 1) >= 0) {
      return html`<img class="star" src="assets/half-star.svg" alt="" />`;
    }

    return html`<img class="star" src="assets/shade-star.svg" alt="" />`;
  };

  render() {
    if (!this.rating) {
      return '';
    }

    return html`${this.rating} ${Array.from({ length: 5 }).map((_, starIdx) => this.starTmpl(starIdx))}`;
  }
}
