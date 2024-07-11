import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppV2 from "./components/v2/AppV2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppV2 />
  </React.StrictMode>
);
