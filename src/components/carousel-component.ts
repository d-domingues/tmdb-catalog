import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { isMovie, TmdbMovie } from '../../models/tmdb-movie.js';
import { TmdbTvShow } from '../../models/tmdb-tv-show.js';
import { imgSrc } from '../directives/img-directive.js';

@customElement('carousel-component')
export class CarouselComponent extends LitElement {
  static styles = css`
    #slideshow-container {
      position: relative;
      padding-top: 8px;
    }

    .backdrop-img {
      width: 100%;
      box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px,
        rgb(0 0 0 / 20%) 0px -3px 0px inset;
    }

    .title,
    .slide-btns {
      color: #f2f2f2;
      font-size: 15px;
      padding: 8px 12px;
      position: absolute;
      width: 100%;
      text-align: center;
    }

    .title {
      position: absolute;
      top: 10px;
      padding: 10px;
      color: white;
      font-size: 16px;
      border-radius: 10px 0px 0px 10px;
      user-select: none;
      background-color: rgba(0, 0, 0, 0.4);
      right: 0px;
      width: auto;
    }

    .slide-btns {
      bottom: 8px;
      width: fit-content;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .slide-btns button {
      cursor: pointer;
      height: 4px;
      width: 40px;
      margin: 2px;
      border-radius: 4px;
      border: none;
    }

    .slide-btns button.active {
      background-color: #717171;
    }
  `;

  @property({ type: Array }) slides: (TmdbMovie | TmdbTvShow)[] = [];

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

    this.intervalId = setInterval(() => {
      this.slideIdx = (this.slideIdx + 1) % this.slides.length;
    }, 5000);
  }

  slideTmpl(item: TmdbMovie | TmdbTvShow, idx: number) {
    const slyles = { position: 'relative', display: this.slideIdx === idx ? 'block' : 'none' };

    return html`
      <div active=${this.slideIdx === idx} style=${styleMap(slyles)}>
        <span class="title">${isMovie(item) ? item.title : item.name}</span>
        <img class="backdrop-img" src="${imgSrc(item.backdrop_path)} " alt="" />
      </div>
    `;
  }

  render() {
    return html`
      <div id="slideshow-container">
        ${this.slides.map((s, idx) => this.slideTmpl(s, idx))}

        <div class="slide-btns">
          ${this.slides.map(
            (_, idx) =>
              html`
                <button
                  class=${classMap({ active: idx === this.slideIdx })}
                  @click=${() => this.restartInterval(idx)}
                ></button>
              `
          )}
        </div>
      </div>
    `;
  }
}
