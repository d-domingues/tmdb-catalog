import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let MyProfile = class MyProfile extends LitElement {
    render() {
        return html ` <div>My Profile</div> `;
    }
};
MyProfile.styles = css ``;
MyProfile = __decorate([
    customElement('my-profile')
], MyProfile);
export { MyProfile };
//# sourceMappingURL=my-profile.js.map