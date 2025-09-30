import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/Auth.context.jsx";

// === Pages & Components ===
import NavBar from "./routes/NavBar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddEvent from "./components/AddEvent";
import Help from "./components/Help";

import "./App.css";

/**
 * App Component
 * -------------
 * Central routing & layout control for Evented.
 * - Handles route protection for authenticated pages
 * - Remembers last visited route to improve user experience
 * - Hides NavBar on login and signup pages
 */
export default function App() {
  const location = useLocation();
  const { state } = useContext(AuthContext);

  const [hydrated, setHydrated] = useState(false);
  const [lastVisited, setLastVisited] = useState("/dashboard");

  // Restore last visited route from localStorage when app loads
  useEffect(() => {
    const stored = localStorage.getItem("lastVisitedPath");
    if (stored) setLastVisited(stored);
    setHydrated(true);
  }, []);

  // Update last visited whenever user navigates (but skip auth pages)
  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      localStorage.setItem("lastVisitedPath", location.pathname);
      setLastVisited(location.pathname);
    }
  }, [location.pathname]);

  // Prevent rendering routes before session is restored
  if (!hydrated) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  const hideNav =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {/*  Global Navigation  */}
      {!hideNav && <NavBar />}

      {/* App Routes  */}
      <Routes>
        {/* Redirect root to either last visited or login */}
        <Route
          path="/"
          element={
            state.isLoggedIn ? (
              <Navigate to={lastVisited} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public routes */}
        <Route
          path="/login"
          element={
            state.isLoggedIn ? <Navigate to={lastVisited} replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            state.isLoggedIn ? (
              <Navigate to={lastVisited} replace />
            ) : (
              <Signup />
            )
          }
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
