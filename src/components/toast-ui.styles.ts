import { css } from 'lit';

export const toastUiStyles = css`
  :host {
    position: fixed;
    z-index: 1;
    inset-block-end: 0;
    inset-inline: 0;
    padding-block-end: 5vh;
    display: grid;
    justify-items: center;
    justify-content: center;
    gap: 1vh;
    pointer-events: none;
  }

  output {
    font-family: system-ui, sans-serif;
    color: white;
    background: green;
    max-inline-size: min(25ch, 90vw);
    padding-block: 0.5ch;
    padding-inline: 1ch;
    border-radius: 3px;
    font-size: 1rem;
    will-change: transform;
    animation: fade-in 0.3s ease, slide-in 0.3s ease, fade-out 0.3s ease calc(var(--duration) * 1ms);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes slide-in {
    from {
      transform: translateY(5vh);
    }
  }
`;
