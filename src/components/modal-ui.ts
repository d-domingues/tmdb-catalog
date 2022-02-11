import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { buttonStyles } from '../common.styles.js';
import { modalUiStyles } from './modal-ui.styles.js';

@customElement('modal-ui')
export class ModalUi extends LitElement {
  static styles = [buttonStyles, modalUiStyles];

  @state() private isActive = false;

  private content: string | TemplateResult<1> = '';
  private resolve!: (value: boolean) => void;

  private onOpen(content: string | TemplateResult<1>) {
    setTimeout(() => (this.isActive = true));
    this.content = content;
    return new Promise<boolean>((res) => (this.resolve = res));
  }

  private onClose(response: boolean) {
    this.isActive = false;
    this.content = null;
    this.resolve(response);
  }

  render() {
    return html`
      <div id="confirm-modal" class=${this.isActive ? 'active' : ''}>
        <div id="modal-content">
          <span id="close-btn" @click=${() => this.onClose(false)} @keyup=${() => this.onClose(false)}>&times;</span>
          ${this.content}
          <button @click=${() => this.onClose(true)}>Sí</button>
          <button @click=${() => this.onClose(false)}>No</button>
        </div>
      </div>
    `;
  }

  static present = (() => {
    let cachedModalUi: ModalUi;

    return (content: string | TemplateResult<1>): Promise<boolean> =>
      new Promise((res) => {
        if (!cachedModalUi) {
          cachedModalUi = document.createElement('modal-ui');
          cachedModalUi.firstUpdated = () => res(ModalUi.present(content));
          document.firstElementChild?.insertBefore(cachedModalUi, document.body);
        } else {
          res(cachedModalUi.onOpen(content));
        }
      });
  })();
}

declare global {
  interface HTMLElementTagNameMap {
    'modal-ui': ModalUi;
  }
}
