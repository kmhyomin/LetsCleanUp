import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.color.text};
    background: ${({ theme }) => theme.color.bg};
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, p {
    margin: 0;
  }

  button {
    font: inherit;
    cursor: pointer;
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`;
