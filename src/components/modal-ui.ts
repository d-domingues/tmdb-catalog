import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { buttonStyles } from '../common.styles.js';
import { confirmationModalStyles } from './confirmation-modal.styles.js';

@customElement('modal-ui')
export class ModalUi extends LitElement {
  static styles = [buttonStyles, confirmationModalStyles];

  @state() private showModal = false;

  private content: string | TemplateResult<1> = '';
  private resolve!: (value: boolean) => void;

  private onOpen(content: string | TemplateResult<1>) {
    this.showModal = true;
    this.content = content;
    return new Promise<boolean>((res) => (this.resolve = res));
  }

  private onClose(response: boolean) {
    this.showModal = false;
    this.content = null;
    this.resolve(response);
  }

  render() {
    return html`
      <div id="confirm-modal" class=${this.showModal ? 'active' : ''}>
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
        if (cachedModalUi) {
          res(cachedModalUi.onOpen(content));
        } else {
          cachedModalUi = document.createElement('modal-ui');

          const obs = new MutationObserver(([{ addedNodes }]) => {
            const isHostRendred = Array.from(addedNodes).some((n) => n instanceof ModalUi);

            if (isHostRendred) {
              obs.disconnect();
              res(cachedModalUi.onOpen(content));
            }
          });
          obs.observe(document.firstElementChild as Node, { childList: true });

          document.firstElementChild?.insertBefore(cachedModalUi, document.body);
        }
      });
  })();
}

declare global {
  interface HTMLElementTagNameMap {
    'modal-ui': ModalUi;
  }
}
