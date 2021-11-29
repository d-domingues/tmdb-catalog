/* eslint-disable wc/guard-super-call */
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { getMediaType, getName, TmdbDataObj } from '../../models/tmdb-data-obj.js';
import { imgSrc } from '../directives/img-directive.js';
import styles from './carousel-component.styles.js';

@customElement('carousel-component')
export class CarouselComponent extends LitElement {
  static styles = styles;

  @property() slides: TmdbDataObj[] = [];
  @state() slideIdx = 0;

  // eslint-disable-next-line no-undef
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

    return item
      ? html`<a class="title" href="details/${getMediaType(item)}/${item.id}">${getName(item)}</a>`
      : nothing;
  };

  render() {
    return html`
      ${this.slides.map(
        (item, idx) => html`
          <img
            style="--slide: ${this.slideIdx}; grid-area: slide${idx}"
            src=${imgSrc(item.backdrop_path, 'w1280')}
            alt=""
          />
        `
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
