import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

:root {
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
  font-optical-sizing: auto;
  -webkit-backdrop-filter: blur(5px) saturate(180%);
  backdrop-filter: blur(5px) saturate(180%);
  background-color: rgba(63, 63, 63, 0.50);
}




`

export default GlobalStyle