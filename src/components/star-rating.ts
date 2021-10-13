import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('star-rating')
export class StarRating extends LitElement {
  static styles = css`
    :host {
      white-space: nowrap;
      justify-content: center;
      display: flex;
      align-items: center;
    }

    .rating {
      font-size: max(1.5vw, 10px);
      margin-right: 5px;
    }

    .star {
      width: max(1.5vw, 12px);
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
    if (!this.rating) {
      return '';
    }

    return html`
      <span class="rating">${this.rating}</span>
      ${Array.from({ length: 5 }).map((_, starIdx) => this.starTmpl(starIdx))}
    `;
  }
}
