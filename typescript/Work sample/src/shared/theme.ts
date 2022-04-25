import { createGlobalStyle, ThemeProps } from "styled-components/macro";

/**
 * This is one of the magic features of Styled-Components. It allows you to define
 * shared styling config values in a single location and use them in all of our
 * styled components.
 */
export const theme = {
  fonts: {
    regular: {
      "font-family": "'Source Sans Pro', sans-serif",
      "font-weight": "400",
    },
    bold: {
      "font-family": "'Source Sans Pro', sans-serif",
      "font-weight": "700",
    },
  },
  colors: {
    fonts: {
      regular: "black",
      dim: "#303030",
      faded: "#979797",
    },
    filter: {
      bg: "#ffecd8",
      checkboxBG: "#fefaf6",
    },
  },
  design: {
    searchbar: {
      fontSize: "16px", // The design doc said "16pt" but the size didn't match.
    },
  },
};

export type MainThemeProps = ThemeProps<typeof theme>;
export const GlobalStyle = createGlobalStyle<MainThemeProps>`
  body {
    margin: 0;
    font-family: ${p => p.theme.fonts.regular};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::after,
  *::before { box-sizing: border-box; touch-action: none; }

  h1, h2, h3, h4, h5, h6 { margin: 0; }

  input,
  textarea,
  button {
    font-family: ${p => p.theme.fonts.regular};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
