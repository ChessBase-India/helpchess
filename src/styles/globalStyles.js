import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    scroll-behavior: smooth;
    /* keep section headings visible below the sticky header */
    scroll-padding-top: 5.5rem;
    -webkit-text-size-adjust: 100%;
    overflow-x: clip;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.ink};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  main {
    font-family: var(--font-body), system-ui, -apple-system, "Segoe UI", sans-serif;
    font-size: 1rem;
    line-height: 1.6;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-heading), var(--font-body), system-ui, sans-serif;
    letter-spacing: -0.02em;
    line-height: 1.15;
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  img {
    max-width: 100%;
  }

  button {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
  }

  a:focus-visible,
  button:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    border-radius: 6px;
  }

  /* decorative check patterns just add clutter on small screens */
  @media (max-width: 640px) {
    .pattern-top,
    .pattern-bottom,
    .pattern {
      display: none;
    }
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.ink};
  }
`;

export default GlobalStyles;
