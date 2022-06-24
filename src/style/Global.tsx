import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}
const InterUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url(${InterUrl}) format('truetype');
    font-display: auto;
  }
  * {
    font-family: 'Inter', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
