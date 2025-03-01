import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

:root {
  color-scheme: light dark;
  background-color: rgba(57,55,51,0.7);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Open Sans', sans-serif;
  font-optical-sizing: auto;
  box-sizing: border-box;
}




`

export default GlobalStyle