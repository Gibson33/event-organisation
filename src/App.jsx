import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useContext } from "react";

import { AuthContext } from "./context/Auth.context.jsx";
import NavBar from "./routes/NavBar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import "./App.css";

function Dashboard() {
  return (
    <main className="main-content">
      <section className="event-list">
        <h2>Event List</h2>
        <p>No events yet...</p>
      </section>
      <section className="calendar">
        <h2>Calendar</h2>
        <p>Calendar will go here</p>
      </section>
    </main>
  );
}

function AddEvent() {
  return (
    <div className="page-content">
      <h2>Add Event Page</h2>
    </div>
  );
}

function Help() {
  return (
    <div className="page-content">
      <h2>Help Page</h2>
    </div>
  );
}

function App() {
  const location = useLocation();
  const { state } = useContext(AuthContext);

  // hide NavBar on login + signup
  const hideNav =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
        {/* default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* auth routes */}
        <Route
          path="/login"
          element={state.isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={state.isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* protected routes */}
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

export default App;
