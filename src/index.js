import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MyGlobalStyle } from "./theme/globalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyGlobalStyle />
    <App />
  </React.StrictMode>
);
