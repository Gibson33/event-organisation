import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
};

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
  const setLoginError = (loginError) => setState({ loginError });

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
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
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
