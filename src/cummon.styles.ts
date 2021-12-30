import { css } from 'lit';

export const buttonStyles = css`
  button {
    outline: none;
    padding: 6px 30px;
    cursor: pointer;
    background: cornflowerblue;
    border: 2px solid royalblue;
    border-radius: 6px;
    color: white;
  }

  button[disabled] {
    opacity: 0.4;
    pointer-events: none;
    cursor: not-allowed;
  }

  button#forward {
    float: right;
  }
`;
