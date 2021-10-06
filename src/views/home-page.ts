import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('home-page')
export class HomePage extends LitElement {
  static styles = css``;

  render() {
    return html` <div>Home</div> `;
  }
}
