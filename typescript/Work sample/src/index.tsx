import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components/macro";

import "./clear.css";
import "./index.css";
import { GlobalStyle, theme } from "./shared/theme";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
