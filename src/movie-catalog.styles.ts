import { css } from 'lit';

export const movieCatalogStyles = css`
  :host {
    font-size: calc(4px + 2vmin);
    color: #1a2b42;
  }

  header {
    background-color: #333333;
    position: fixed;
    z-index: 9;
    height: 50px;
    width: 100%;
    top: 0px;
  }

  header img {
    cursor: pointer;
    float: right;
    padding: 10px;
  }

  header img:hover {
    background-color: #adaaff80;
  }

  main {
    max-width: 1000px;
    margin: 58px auto 40px;
    min-height: calc(100vh - 210px);
    position: relative;
  }

  footer {
    font-size: calc(12px + 0.5vmin);
    text-align: center;
    background: #333333;
    color: white;
    height: 100px;
    padding-top: 20px;
  }

  /* Responsive for mobile devices */
  @media only screen and (max-width: 600px) {
    main {
      margin: 58px 8px 28px;
    }
  }
`;
