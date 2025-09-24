import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Auth.context.jsx";
import "./index.css";
import App from "./App.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
