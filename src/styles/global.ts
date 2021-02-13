import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: linear-gradient(-45deg, #d1c454, #71cc8f);
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 16px;
    font-family: 'Roboto Slab', serif;
  }

  h1, h2, h3, h4, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
