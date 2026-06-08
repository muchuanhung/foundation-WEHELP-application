import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";

// Set to true if this is NOT your first application
const SHOW_Q7 = false;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App showQ7={SHOW_Q7} />
  </StrictMode>
);
