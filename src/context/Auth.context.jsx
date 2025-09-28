import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
};

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    // On load, check localStorage for persisted login
    const stored = localStorage.getItem("authState");
    return stored ? JSON.parse(stored) : initialState;
  });

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  const setLoginPending = (isLoginPending) =>
    setState((prev) => ({ ...prev, isLoginPending }));

  const setLoginSuccess = (isLoggedIn) =>
    setState((prev) => ({ ...prev, isLoggedIn }));

  const setLoginError = (loginError) =>
    setState((prev) => ({ ...prev, loginError }));

  const login = (email, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin(email, password, (error) => {
      setLoginPending(false);
      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    });
  };

  const logout = () => {
    setState(initialState);
    localStorage.removeItem("authState");
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// fake login
const fetchLogin = (email, password, callback) =>
  setTimeout(() => {
    if (email === "admin@gmail.com" && password === "admin12##!") {
      return callback(null);
    } else {
      return callback(new Error("Invalid email and password"));
    }
  }, 1000);
