import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-list')
export class MyList extends LitElement {
  static styles = css``;

  render() {
    return html`<div>My List</div>`;
  }
}
