import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let MyList = class MyList extends LitElement {
    render() {
        return html `<div>My List</div>`;
    }
};
MyList.styles = css ``;
MyList = __decorate([
    customElement('my-list')
], MyList);
export { MyList };
//# sourceMappingURL=my-list.js.map