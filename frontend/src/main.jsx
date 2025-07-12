import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SensorProvider } from "./context/SensorContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <SensorProvider>
    <App />
  </SensorProvider>
);
