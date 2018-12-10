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
    background-color: #fff;
    font-family: 'Montserrat Regular';
    font-size: 16px;
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
  
  button:focus, input:focus, select:focus {
    outline: none !important;
    box-shadow: 0 0 0 5px #E7EDF8;
  }
  
  @font-face {
    font-family: 'Montserrat Regular';
    src: url('montserrat-regular-webfont.ttf') format('font-truetype'),
    url('montserrat-regular-webfont.woff2') format('font-woff2'),
    url('montserrat-regular-webfont.woff') format('font-woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
  font-family: 'Montserrat Medium';
  src: url('montserrat-medium-webfont.ttf') format('font-truetype'),
    url('montserrat-medium-webfont.woff2') format('font-woff2'),
    url('montserrat-medium-webfont.woff') format('font-woff');
  font-weight: normal;
  font-style: normal;
  }

  @font-face {
  font-family: 'Montserrat Bold';
  src:  url('montserrat-bold-webfont.ttf') format('font-truetype'),
    url('montserrat-bold-webfont.woff2') format('font-woff2'),
    url('montserrat-bold-webfont.woff') format('font-woff');
  font-weight: bold;
  font-style: normal;
}

`;

export default GlobalStyle;
