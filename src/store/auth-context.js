import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  onLogin: (token) => {},
  onLogout: () => {},
  onNewUserData: (user) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [user, setUserData] = useState({});

  const loginHandler = (token) => {
    setIsLoggedIn(true);
    setToken(token);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setToken(null);
  };

  const setUserHandler = (user) => {
    setUserData(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        user,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onNewUserData: setUserHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
