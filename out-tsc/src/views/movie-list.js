import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let MovieList = class MovieList extends LitElement {
    render() {
        return html ` <div>Movie List</div> `;
    }
};
MovieList.styles = css ``;
MovieList = __decorate([
    customElement('movie-list')
], MovieList);
export { MovieList };
//# sourceMappingURL=movie-list.js.map