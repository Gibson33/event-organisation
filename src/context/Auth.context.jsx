import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  signupError: null,
  currentUser: null,
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // ✅ Restore session from localStorage
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
    return true;
  };

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
          isLoggedIn: false,
          isLoginPending: false,
          loginError: new Error("Invalid email or password"),
        }));
      }
    }, 500);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setState(initialState);
  };

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
