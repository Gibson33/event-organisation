import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext(null);

// === Initial Authentication State ===
const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  signupError: null,
  currentUser: null,
};

/**
 * AuthProvider
 * ------------
 * A lightweight authentication context using `localStorage`.
 * Supports:
 *  - Signup (stores users in localStorage)
 *  - Login/Logout (persists session in localStorage)
 *  - Session restoration on page reload
 *  - Inline error handling for invalid login/signup
 *
 */
export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setState({
        ...initialState,
        isLoggedIn: true,
        currentUser: JSON.parse(storedUser),
      });
    }
  }, []);

  // SIGNUP
  const signup = (email, password, username) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Prevent duplicate emails
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
    return true;
  };

  // LOGIN
  const login = (email, password) => {
    setState((prev) => ({
      ...prev,
      isLoginPending: true,
      loginError: null,
    }));

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const match = users.find(
        (u) => u.email === email && u.password === password
      );

      if (match) {
        localStorage.setItem("currentUser", JSON.stringify(match));
        setState({
          ...initialState,
          isLoggedIn: true,
          currentUser: match,
        });
      } else {
        setState((prev) => ({
          ...prev,
          isLoginPending: false,
          isLoggedIn: false,
          loginError: new Error("Invalid email or password"),
        }));
      }
    }, 500);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("currentUser");
    setState(initialState);
  };

  //  CLEAR ERRORS (used when switching pages)
  const clearErrors = () => {
    setState((prev) => ({
      ...prev,
      loginError: null,
      signupError: null,
    }));
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, signup, clearErrors }}>
      {children}
    </AuthContext.Provider>
  );
};
