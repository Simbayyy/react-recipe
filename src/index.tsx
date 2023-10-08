import React from "react";
import ReactDOM from "react-dom/client";
import "./static/index.css";
import "./static/App.css";
import { App } from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(<App />);
