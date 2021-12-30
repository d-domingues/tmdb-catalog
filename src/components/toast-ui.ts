import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { toastUiStyles } from './toast-ui.styles.js';

@customElement('toast-ui')
export class ToastUi extends LitElement {
  static styles = toastUiStyles;

  addToast(text: string) {
    const node = document.createElement('output');

    node.innerText = text;
    node.addEventListener('animationend', (event: AnimationEvent) => {
      if (event.animationName === 'fade-out') {
        (event.target as HTMLOutputElement).remove();
      }
    });

    this.renderRoot?.appendChild(node);
  }

  // static function that instanciates and memoizes a ToastUi component at the DOM
  static present = (() => {
    let cachedToastUi: ToastUi;

    return (text: string, duration = 3000): Promise<ToastUi> =>
      new Promise(res => {
        function addAndResolve() {
          cachedToastUi.style.setProperty('--duration', `${duration}`);
          cachedToastUi.addToast(text);
          res(cachedToastUi);
        }

        if (cachedToastUi) {
          addAndResolve();
        } else {
          cachedToastUi = document.createElement('toast-ui');

          const observer = new MutationObserver(([{ addedNodes }]) => {
            const isHostRendred = Array.from(addedNodes).some(n => n instanceof ToastUi);

            if (isHostRendred) {
              observer.disconnect();
              addAndResolve();
            }
          });
          observer.observe(document.firstElementChild as Node, { childList: true });

          document.firstElementChild?.insertBefore(cachedToastUi, document.body);
        }
      });
  })();
}

declare global {
  interface HTMLElementTagNameMap {
    'toast-ui': ToastUi;
  }
}
