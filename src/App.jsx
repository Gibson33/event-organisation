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

  // 📝 Track last visited path (except login/signup)
  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      localStorage.setItem("lastVisitedPath", location.pathname);
    }
  }, [location.pathname]);

  const lastVisited = localStorage.getItem("lastVisitedPath") || "/dashboard";

  // 🧭 On refresh, if user is logged in and lands on login/signup → go back to last visited
  useEffect(() => {
    if (state.isLoggedIn) {
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate(lastVisited, { replace: true });
      }
    }
  }, [state.isLoggedIn, location.pathname, navigate, lastVisited]);

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
