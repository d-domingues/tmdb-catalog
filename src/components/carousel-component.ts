import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { imgSrc } from '../directives/img-directive.js';
import { getMediaType, getName, TmdbDataObj } from '../models/tmdb-data-obj.js';
import styles from './carousel-component.styles.js';

@customElement('carousel-component')
export class CarouselComponent extends LitElement {
  static styles = styles;

  @property() slides: TmdbDataObj[] = [];
  @state() slideIdx = 0;

  private intervalId!: NodeJS.Timeout;

  constructor() {
    super();
    this.restartInterval(0);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.intervalId);
  }

  restartInterval(val: number) {
    clearInterval(this.intervalId);

    this.slideIdx = val;

    this.intervalId = setInterval(() => (this.slideIdx = (this.slideIdx + 1) % this.slides.length), 5000);
  }

  titleTmpl = () => {
    const item = this.slides[this.slideIdx];

    return item ? html`<a class="title" href="details/${getMediaType(item)}/${item.id}">${getName(item)}</a>` : nothing;
  };

  render() {
    this.style.setProperty('--slide', `${this.slideIdx}`);

    return html`
      ${this.slides.map((item, idx) => html` <img style="grid-area: slide${idx}" src=${imgSrc(item.backdrop_path, 'w1280')} alt="" /> `)}
      ${this.titleTmpl()}
      <div class="slide-btns">
        ${this.slides.map(
          (_, idx) => html` <button class="${idx === this.slideIdx ? 'active' : ''}" @click=${() => this.restartInterval(idx)}></button> `
        )}
      </div>
    `;
  }
}
