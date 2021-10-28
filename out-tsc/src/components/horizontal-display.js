import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getYear, isMovie } from '../../models/tmdb-data-obj.js';
import { imgSrc } from '../directives/img-directive.js';
import { horizontalDisplaySyles } from './styles.js';
let HorizontalDisplay = class HorizontalDisplay extends LitElement {
    constructor() {
        super(...arguments);
        this.title = '';
    }
    render() {
        return html `
      <h5>${this.title}</h5>
      ${this.items.map(item => html `
          <div class="movie-card">
            <a href="details/${isMovie(item) ? 'movie/' : 'tv/'}${item.id}">
              <img src=${imgSrc(item.poster_path, 'w185')} alt="" />
            </a>
            <b class="label">
              ${(isMovie(item) ? item.title : item.name).substr(0, 40)} (${getYear(item)})
            </b>
            <span class="rating">
              ${item.vote_average}
              <star-rating size="16" rating=${item.vote_average}></star-rating>
            </span>
          </div>
        `)}
    `;
    }
};
HorizontalDisplay.styles = horizontalDisplaySyles;
__decorate([
    property()
], HorizontalDisplay.prototype, "title", void 0);
__decorate([
    property({ type: Array })
], HorizontalDisplay.prototype, "items", void 0);
HorizontalDisplay = __decorate([
    customElement('horizontal-display')
], HorizontalDisplay);
export { HorizontalDisplay };
//# sourceMappingURL=horizontal-display.js.map