import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "../node_modules/sonner/dist/index";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
);
