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
    background: #4f907a;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #6A6180;
    border: 0;
    border-radius: 4px;
    height: 72px;
    font-size: 24px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
  }

  h1, h2, h3, h4, strong {
    color: #32264D;
    font-weight: 700;
    font-family: 'Archivo', sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
