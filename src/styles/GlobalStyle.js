import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  body, html, #app {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
  }

  @font-face {
    font-family: 'Montserrat Regular';
    src: url('../assets/fonts/Montserrat-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
  font-family: 'Montserrat Medium';
  src: url('../assets/fonts/Montserrat-Medium.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  }

  @font-face {
  font-family: 'Montserrat Bold';
  src: url('../assets/fonts/Montserrat-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

`;

export default GlobalStyle;
