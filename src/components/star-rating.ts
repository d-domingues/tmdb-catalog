import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('star-rating')
export class StarRating extends LitElement {
  @property() rating = 0;
  @property() size = 20;

  starTmpl = (idx: number) => {
    let src = 'assets/shade-star.svg';

    if (this.rating - (idx + 1) * 2 >= 0) {
      src = 'assets/gold-star.svg';
    } else if (this.rating - ((idx + 1) * 2 - 1) >= 0) {
      src = 'assets/half-star.svg';
    }

    return html`<img
      style=${styleMap({ width: `${this.size}px`, margin: '0 1px' })}
      src=${src}
      alt=""
    />`;
  };

  render() {
    return html`${Array.from({ length: 5 }).map((_, starIdx) => this.starTmpl(starIdx))}`;
  }
}
