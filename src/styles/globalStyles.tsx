import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto"

export const GlobalStyles = createGlobalStyle`
  body {
    /* margin: 0;
    padding: 0;
    height: 100%;
    width: 100%; */
    font-family: "Roboto";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
  }
  /*
  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  /*

  code {
   font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
 } */
`