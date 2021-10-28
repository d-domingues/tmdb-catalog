import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { markAsFavorite } from '../tmdb.api';
let MarkFavorite = class MarkFavorite extends LitElement {
    constructor() {
        super(...arguments);
        this.favorite = false;
    }
    async onClick() {
        try {
            this.favorite = !this.favorite;
            await markAsFavorite(this.mediaType, this.mediaId, this.favorite);
        }
        catch (error) {
            // if fails the favorite state returns to the original value
            this.favorite = !this.favorite;
        }
    }
    render() {
        return html `
      <img
        height="25"
        style="cursor:pointer"
        src="assets/${this.favorite ? 'red' : 'shade'}-heart.svg"
        alt=""
        @click=${this.onClick}
        @keyup=${this.onClick}
      />
    `;
    }
};
__decorate([
    property({ type: Boolean })
], MarkFavorite.prototype, "favorite", void 0);
__decorate([
    property({ type: String })
], MarkFavorite.prototype, "mediaType", void 0);
__decorate([
    property({ type: Number })
], MarkFavorite.prototype, "mediaId", void 0);
MarkFavorite = __decorate([
    customElement('mark-favorite')
], MarkFavorite);
export { MarkFavorite };
//# sourceMappingURL=mark-favorite.js.map