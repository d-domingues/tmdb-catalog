import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { TmdbMovie } from '../../models/tmdb-movie.js';
import { imgBackdropSrc } from '../tmdb.api.js';

@customElement('carousel-component')
export class CarouselComponent extends LitElement {
  static styles = css`
    .slideshow-container {
      position: relative;
    }

    #backdrop-img {
      width: 100%;
      box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
    }

    .prev,
    .next {
      cursor: pointer;
      position: absolute;
      top: 50%;
      padding: 16px;
      margin-top: -22px;
      color: white;
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
      user-select: none;
    }

    .next {
      right: 0;
      border-radius: 3px 0 0 3px;
    }

    .prev:hover,
    .next:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    #title,
    .slide-btns {
      color: #f2f2f2;
      font-size: 15px;
      padding: 8px 12px;
      position: absolute;
      width: 100%;
      text-align: center;
    }

    #title {
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: auto;
      border-radius: 3px;
      background: #00000066;
    }

    .slide-btns {
      bottom: 8px;
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

  @property() slides: TmdbMovie[] = [];

  @state() slideIdx = 0;

  intervalId: any;

  constructor() {
    super();
    this.restartInterval();
  }

  setSlide(idx: number) {
    this.slideIdx = idx;
    this.restartInterval();
  }

  restartInterval() {
    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      this.slideIdx = (this.slideIdx + 1) % this.slides.length;
    }, 5000);
  }

  slideTmpl(src: TmdbMovie, idx: number) {
    const slyles = { display: this.slideIdx === idx ? 'block' : 'none' };

    return html`
      <div style=${styleMap(slyles)}>
        <span id="title">${src.original_title}</span>
        <img id="backdrop-img" src=${imgBackdropSrc(src)} alt="movie backdrop" />
      </div>
    `;
  }

  render() {
    return html`
      <div class="slideshow-container">
        ${this.slides.map((s, idx) => this.slideTmpl(s, idx))}
        <!--
        <span class="prev">&#10094;</span>
        <span class="next">&#10095;</span>
        -->

        <div class="slide-btns">
          ${this.slides.map(
            (s, idx) => html`<button class=${idx === this.slideIdx ? 'active' : ''} @click=${() => this.setSlide(idx)}></button>`
          )}
        </div>
      </div>
    `;
  }
}
