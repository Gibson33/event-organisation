import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  currentUser: null,
};

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // ✅ Restore user session from localStorage when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setState({
        isLoggedIn: true,
        isLoginPending: false,
        loginError: null,
        currentUser: JSON.parse(storedUser),
      });
    }
  }, []);

  const signup = (email, password, username) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      setState((prev) => ({
        ...prev,
        loginError: new Error("Email already exists"),
      }));
      return false;
    }

    const newUser = { email, password, username };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const login = (email, password) => {
    setState((prev) => ({ ...prev, isLoginPending: true, loginError: null }));

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const match = users.find(
        (u) => u.email === email && u.password === password
      );

      if (match) {
        localStorage.setItem("currentUser", JSON.stringify(match));
        setState({
          isLoggedIn: true,
          isLoginPending: false,
          loginError: null,
          currentUser: match,
        });
      } else {
        setState({
          isLoggedIn: false,
          isLoginPending: false,
          loginError: new Error("Invalid email or password"),
          currentUser: null,
        });
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
};
