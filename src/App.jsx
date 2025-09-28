import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";

import { AuthContext } from "./context/Auth.context.jsx";
import NavBar from "./routes/NavBar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddEvent from "./components/AddEvent";
import "./App.css";

function Help() {
  return (
    <div className="page-content">
      <h2>Help Page</h2>
      <p>Some helpful info or FAQs can be displayed here.</p>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  // 🧭 Auto-redirect if logged in on refresh
  useEffect(() => {
    if (
      state.isLoggedIn &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      navigate("/dashboard", { replace: true });
    }
  }, [state.isLoggedIn, location.pathname, navigate]);

  // Hide NavBar on login and signup pages
  const hideNav =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNav && <NavBar />}

      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route
          path="/login"
          element={state.isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={state.isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={state.isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/addEvent"
          element={state.isLoggedIn ? <AddEvent /> : <Navigate to="/login" />}
        />
        <Route
          path="/help"
          element={state.isLoggedIn ? <Help /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
