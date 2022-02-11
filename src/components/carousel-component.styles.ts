import { css } from 'lit';

const styles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(4, 100%);
    grid-template-areas: 'slide0 slide1 slide2 slide3';
    overflow: hidden;
    box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
  }

  :host > * {
    z-index: 0;
  }

  :host img {
    width: 100%;
    transition: transform 1s ease 0s;
    transform: translateX(calc(-100% * var(--slide)));
  }

  .title {
    grid-area: slide0;
    place-self: start end;
    margin-block: 18px;
    text-decoration: none;
    color: white;
    border-radius: 10px 0px 0px 10px;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 15px;
    padding: 8px 12px;
  }

  .slide-btns {
    grid-area: slide0;
    place-self: end center;
    margin-block-end: 12px;
  }

  .slide-btns button {
    cursor: pointer;
    height: 4px;
    width: 40px;
    margin: 2px;
    border-radius: 4px;
    border: none;
  }

  .slide-btns button.active {
    background-color: #717171;
  }
`;

export default styles;
