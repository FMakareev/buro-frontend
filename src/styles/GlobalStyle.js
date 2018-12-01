import { createGlobalStyle } from 'styled-components';
import BG from '../assets/image/bg.jpg';

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  body, html, #app {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100vh;
    background-image: url('../assets/image/background_hi.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #fff;
  }
  #app{
    background-color: #fff;
    background-image: url(${BG});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  a {
    text-decoration: none;
    color: inherit;
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
