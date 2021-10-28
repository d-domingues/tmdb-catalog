import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
let StarRating = class StarRating extends LitElement {
    constructor() {
        super(...arguments);
        this.rating = 0;
        this.size = 20;
        this.starTmpl = (idx) => {
            let src = 'assets/shade-star.svg';
            if (this.rating - (idx + 1) * 2 >= 0) {
                src = 'assets/gold-star.svg';
            }
            else if (this.rating - ((idx + 1) * 2 - 1) >= 0) {
                src = 'assets/half-star.svg';
            }
            return html `<img
      style=${styleMap({ width: `${this.size}px`, margin: '0 1px' })}
      src=${src}
      alt=""
    />`;
        };
    }
    render() {
        return html `${Array.from({ length: 5 }).map((_, starIdx) => this.starTmpl(starIdx))}`;
    }
};
__decorate([
    property()
], StarRating.prototype, "rating", void 0);
__decorate([
    property()
], StarRating.prototype, "size", void 0);
StarRating = __decorate([
    customElement('star-rating')
], StarRating);
export { StarRating };
//# sourceMappingURL=star-rating.js.map