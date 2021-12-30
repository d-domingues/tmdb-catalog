import { css } from 'lit';

const styles = css`
  #stack {
    display: grid;
    width: fit-content;
  }

  #stack > * {
    grid-area: 1 / -1;
  }

  #title,
  #rating {
    align-self: end;
    margin: 14px 50px;
    color: white;
    font-size: 16px;
    text-shadow: 1px 1px 2px black;
    font-weight: bold;
  }

  #rating {
    justify-self: end;
  }

  #backdrop-img {
    width: 100%;
    box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px,
      rgb(0 0 0 / 20%) 0px -3px 0px inset;
  }

  h4 {
    margin-bottom: 14px;
  }

  #details {
    display: flex;
    column-gap: 12px;
    margin: 10px 0;
  }

  #genres {
    min-width: 36%;
  }

  .genre {
    border: solid 1.5px darkgray;
    border-radius: 26px;
    padding: 5px 12px;
    font-size: 14px;
    color: darkgray;
    width: max-content;
    margin: 2px;
    display: inline-block;
  }

  #overview {
    text-align: justify;
  }

  #cast-scroller {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-auto-flow: column;
    grid-auto-columns: 16%;
    column-gap: 0.7%;
    text-align: center;
    align-items: center;
    overflow-x: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    width: 100%;
  }

  #cast-scroller img {
    width: 90px;
    height: 100px;
    border-radius: 44%;
    margin: auto;
  }

  #cast-scroller b {
    font-size: 14px;
    scroll-snap-align: start;
  }

  #cast-scroller span {
    font-size: 14px;
    color: gray;
  }

  button {
    cursor: pointer;
    border: none;
    font-weight: bold;
    font-size: 30px;
    font-family: monospace;
  }

  @media only screen and (max-width: 600px) {
    #cast-scroller {
      grid-auto-columns: 33%;
      column-gap: 0.3%;
    }

    #title,
    #rating {
      margin: 14px 14px;
      font-size: 14px;
    }
  }
`;

export default styles;
