import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth.context.jsx";
import { EventsProvider } from "./context/Events.context.jsx";
import App from "./App.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventsProvider>
          <App />
        </EventsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
