import { html, LitElement, render, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { buttonStyles } from '../cummon.styles.js';
import { confirmationModalStyles } from './confirmation-modal.styles.js';

@customElement('confirmation-modal')
export class ConfirmationModal extends LitElement {
  static styles = [buttonStyles, confirmationModalStyles];

  @state() private showModal = false;

  private content: string | TemplateResult<1> = '';
  private resolve!: (value: boolean) => void;

  show(content: string | TemplateResult<1>) {
    this.content = content;
    this.showModal = true;
    return new Promise<boolean>(res => (this.resolve = res));
  }

  private onRespond(response: boolean) {
    this.showModal = false;
    this.resolve(response);
  }

  /**
   * Dynamically attaches a ConfirmationModal node at the document.body in case its none
   * created yet and returns it (thus performing memoization)!
   */
  static generate(): Promise<ConfirmationModal> {
    const modalNode: ConfirmationModal | null = document.querySelector('confirmation-modal');

    if (modalNode) {
      return Promise.resolve(modalNode);
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
          <span
            class="close"
            @click=${() => this.onRespond(false)}
            @keyup=${() => this.onRespond(false)}
            >&times;</span
          >
          ${this.content}
          <button @click=${() => this.onRespond(true)}>Sí</button>
          <button @click=${() => this.onRespond(false)}>No</button>
        </div>
      </div>
    `;
  }
}
