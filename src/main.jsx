import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import QueryClientSetup from "./QueryClientSetup.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientSetup>
      <App />
    </QueryClientSetup>
  </React.StrictMode>
);
