// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #f8fafc;
    color: #1f2937;
  }
`;

export default GlobalStyle;
