import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-profile')
export class MyProfile extends LitElement {
  static styles = css``;

  render() {
    return html` <div>My Profile</div> `;
  }
}
