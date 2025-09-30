import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/Auth.context.jsx";
import NavBar from "./routes/NavBar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddEvent from "./components/AddEvent";
import Help from "./components/Help";
import "./App.css";

export default function App() {
  const location = useLocation();
  const { state } = useContext(AuthContext);
  const [lastVisited, setLastVisited] = useState("/dashboard");
  const [hydrated, setHydrated] = useState(false); // ✅ new

  // Track last visited path
  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      localStorage.setItem("lastVisitedPath", location.pathname);
      setLastVisited(location.pathname);
    }
  }, [location.pathname]);

  // Restore lastVisited once
  useEffect(() => {
    const stored = localStorage.getItem("lastVisitedPath");
    if (stored) setLastVisited(stored);
    setHydrated(true); // ✅ only render routes once auth/localStorage is ready
  }, []);

  if (!hydrated) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }

  const hideNav =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNav && <NavBar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
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
