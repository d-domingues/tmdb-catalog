import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('star-rating')
export class StarRating extends LitElement {
  static styles = css`
    .rating {
      margin-right: 5px;
      font-size: max(1.5vw, 14px);
    }

    .star {
      width: max(1.5vw, 14px);
    }
  `;

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
    return html`
      <span class="rating">${this.rating}</span>
      ${Array.from({ length: 5 }).map((_, starIdx) => this.starTmpl(starIdx))}
    `;
  }
}
