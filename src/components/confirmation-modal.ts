import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { buttonStyles } from '../cummon.styles.js';
import { confirmationModalStyles } from './confirmation-modal.styles.js';

@customElement('confirmation-modal')
export class ConfirmationModal extends LitElement {
  static styles = [buttonStyles, confirmationModalStyles];

  @state() private showModal = false;

  content = '';

  private resolve!: (value: boolean) => void;

  show(content: string): Promise<boolean> {
    this.content = content;
    this.showModal = true;
    return new Promise(res => (this.resolve = res));
  }

  close() {
    this.showModal = false;
  }

  private onRespond(response: boolean) {
    this.close();
    this.resolve(response);
  }

  /**
   * Dynamically attaches a ConfirmationModal node at the document.body in case its none
   * created yet and returns it (thus performing memoization)!
   */
  static generate(): Promise<ConfirmationModal> {
    const modal: ConfirmationModal | null = document.querySelector('confirmation-modal');

    if (modal) {
      return Promise.resolve(modal);
    }

    render(html`<confirmation-modal></confirmation-modal>`, document.body);

    // the created object must be removed from the event loop so that the transition animation
    // will work when the modal is first created
    return new Promise(res =>
      setTimeout(() => res(document.querySelector('confirmation-modal') as ConfirmationModal), 0)
    );
  }

  render() {
    return html`
      <div id="confirm-modal" class=${classMap({ active: this.showModal })}>
        <div class="modal-content">
          <span class="close" @click=${this.close} @keyup=${this.close}>&times;</span>
          <p>${this.content}</p>

          <button @click=${() => this.onRespond(true)}>Sí</button>
          <button @click=${() => this.onRespond(false)}>No</button>
        </div>
      </div>
    `;
  }
}
