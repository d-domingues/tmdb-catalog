import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
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
    // this.shadowRoot?.querySelector;
    document.querySelector('confirmation-modal')?.remove();
  }

  /**
   * Dynamically attaches a ConfirmationModal node at the document.body,
   * the created object must be removed from the event loop so that the,
   * transition animation will work when the modal is first created
   */
  static generate(): Promise<ConfirmationModal> {
    const modalNode = document.createElement('confirmation-modal');
    document.body.append(modalNode);

    /*     modalNode.shadowRoot?.firstChild?.ontransitionend = (e) => {
Node.classLis !contains 'active' ?
then Node.remove()

modalNode!.ontransitionstart = () => console.log('Transition started');
    modalNode!.ontransitionrun = () => console.log('Transition running');
    modalNode!.ontransitionend = () => console.log('Transition ended');
    } */
    return new Promise(res => setTimeout(res, 0, modalNode));
  }

  render() {
    return html`
      <div id="confirm-modal" class=${this.showModal ? 'active' : ''}>
        <div id="modal-content">
          <span
            id="close-btn"
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
