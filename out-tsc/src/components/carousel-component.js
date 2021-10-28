import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { isMovie } from '../../models/tmdb-data-obj.js';
import { imgSrc } from '../directives/img-directive.js';
import styles from './carousel-component.styles.js';
let CarouselComponent = class CarouselComponent extends LitElement {
    constructor() {
        super();
        this.slides = [];
        this.slideIdx = 0;
        this.titleTmpl = () => {
            const item = this.slides[this.slideIdx];
            return html `
      <a class="title" href="details/${isMovie(item) ? 'movie' : 'tv'}/${item.id}">
        ${isMovie(item) ? item.title : item.name}
      </a>
    `;
        };
        this.restartInterval(0);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.intervalId);
    }
    restartInterval(val) {
        clearInterval(this.intervalId);
        this.slideIdx = val;
        this.intervalId = setInterval(() => (this.slideIdx = (this.slideIdx + 1) % this.slides.length), 5000);
    }
    render() {
        return html `
      ${this.slides.map((item, idx) => html `<img
            style="--slide: ${this.slideIdx}; grid-area: slide${idx}"
            src=${imgSrc(item.backdrop_path)}
            alt=""
          />`)}
      ${this.titleTmpl()}
      <div class="slide-btns">
        ${this.slides.map((_, idx) => html `
            <button
              class=${classMap({ active: idx === this.slideIdx })}
              @click=${() => this.restartInterval(idx)}
            ></button>
          `)}
      </div>
    `;
    }
};
CarouselComponent.styles = styles;
__decorate([
    property({ type: Array })
], CarouselComponent.prototype, "slides", void 0);
__decorate([
    state()
], CarouselComponent.prototype, "slideIdx", void 0);
CarouselComponent = __decorate([
    customElement('carousel-component')
], CarouselComponent);
export { CarouselComponent };
//# sourceMappingURL=carousel-component.js.map