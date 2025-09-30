// src/context/Auth.context.jsx
import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  signupError: null,
  currentUser: null,
};

export function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setState((prev) => ({
        ...prev,
        isLoggedIn: true,
        currentUser: JSON.parse(storedUser),
      }));
    }
  }, []);

  const signup = (email, password, username) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      setState((prev) => ({
        ...prev,
        signupError: new Error("Email already exists"),
      }));
      return false;
    }

    const newUser = { email, password, username };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setState((prev) => ({ ...prev, signupError: null }));
    return true;
  };

  const login = (email, password) => {
    setState((prev) => ({
      ...prev,
      isLoginPending: true,
      loginError: null,
      signupError: null,
    }));

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const match = users.find(
        (u) => u.email === email && u.password === password
      );

      if (match) {
        localStorage.setItem("currentUser", JSON.stringify(match));
        setState((prev) => ({
          ...prev,
          isLoggedIn: true,
          isLoginPending: false,
          loginError: null,
          currentUser: match,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isLoggedIn: false,
          isLoginPending: false,
          loginError: new Error("Invalid email or password"),
          currentUser: null,
        }));
      }
    }, 500);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setState(initialState);
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
