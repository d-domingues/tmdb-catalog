import { css } from 'lit';

export const confirmationModalStyles = css`
  #confirm-modal {
    position: fixed;
    z-index: 100;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    /* animation */
    transition: 200ms ease-in-out;
    opacity: 0;
    pointer-events: none;
  }

  #confirm-modal.active {
    opacity: 1;
    pointer-events: all;
  }

  .modal-content {
    background-color: #fefefe;
    position: absolute;
    top: 40%;
    left: 50%;
    padding: 20px;
    border: 1px solid #888;
    width: 40%;
    /* animation */
    transition: all 200ms ease-in-out;
    transform: translate(-50%, -50%) scale(0);
  }

  #confirm-modal.active .modal-content {
    transform: translate(-50%, -50%) scale(1);
  }

  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;
