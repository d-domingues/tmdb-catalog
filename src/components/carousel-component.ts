import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { isMovie, TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { imgSrc } from '../directives/img-directive.js';
import styles from './carousel-component.styles.js';

@customElement('carousel-component')
export class CarouselComponent extends LitElement {
  static styles = styles;

  @property({ type: Array }) slides: TmdbDataObj[] = [];
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

    this.intervalId = setInterval(
      () => (this.slideIdx = (this.slideIdx + 1) % this.slides.length),
      5000
    );
  }

  titleTmpl = () => {
    const item = this.slides[this.slideIdx];

    return html`
      <a class="title" href="details/${isMovie(item) ? 'movie' : 'tv'}/${item.id}">
        ${isMovie(item) ? item.title : item.name}
      </a>
    `;
  };

  render() {
    return html`
      ${this.slides.map(
        (item, idx) =>
          html`<img
            style="--slide: ${this.slideIdx}; grid-area: slide${idx}"
            src=${imgSrc(item.backdrop_path)}
            alt=""
          />`
      )}
      ${this.titleTmpl()}
      <div class="slide-btns">
        ${this.slides.map(
          (_, idx) => html`
            <button
              class=${classMap({ active: idx === this.slideIdx })}
              @click=${() => this.restartInterval(idx)}
            ></button>
          `
        )}
      </div>
    `;
  }
}
