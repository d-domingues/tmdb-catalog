import { html, render } from 'lit';

function createToast() {
  render(
    html`
      <style>
        #toast-bar {
          min-width: 250px;
          transform: translateX(-50%);
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 16px;
          position: fixed;
          z-index: 99999;
          left: 50%;
          font-size: 16px;
          /* animation */
          transition: all 0.5s ease-in-out;
          visibility: hidden;
          opacity: 0;
          bottom: 0px;
        }

        #toast-bar.show {
          visibility: visible;
          opacity: 1;
          bottom: 30px;
        }
      </style>
      <div id="toast-bar"></div>
    `,
    document.body,
    {
      renderBefore: document.body.firstChild,
    }
  );

  return new Promise(res => setTimeout(() => res(null), 100));
}

export async function presentToast(
  text: string,
  color: 'success' | 'error' = 'success',
  time = 3000
) {
  let toastBar = document.getElementById('toast-bar');

  if (!toastBar) {
    await createToast();
    toastBar = document.getElementById('toast-bar');
  }

  switch (color) {
    case 'error':
      toastBar!.style.background = '#a70a0a';
      break;
    default:
      toastBar!.style.background = '#4e7646';
      break;
  }

  toastBar!.textContent = text;
  toastBar?.classList.toggle('show');
  setTimeout(() => toastBar?.classList.toggle('show'), time);
}
