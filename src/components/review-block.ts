import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Review } from '../models/tmdb-data-obj.js';

@customElement('review-block')
export class ReviewBlock extends LitElement {
  static styles = css``;

  @property() review!: Review;

  render() {
    return html`<div>${this.review.content}</div>`;
  }
}
