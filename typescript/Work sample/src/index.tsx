import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components/macro";

import "./clear.css";
import "./index.css";
import { GlobalStyle, theme } from "./shared/theme";

import App from "./App";
import { FiltersProvider } from "./context/FiltersContext";


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
