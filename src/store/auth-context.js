import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  expiresIn: null,
  onLogin: (token) => {},
  onLogout: () => {},
  onNewUserData: (user) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const [user, setUserData] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpDate = localStorage.getItem("expiration");

    if (storedExpDate && storedExpDate < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      localStorage.removeItem("user");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!!storedToken && !!storedExpDate && !!storedUser) {
      setToken(storedToken);
      setIsLoggedIn(true);
      setExpiresIn(storedExpDate);
      setUserData(storedUser);
    }
  }, []);

  const loginHandler = (token, secTillExp, user) => {
    setIsLoggedIn(true);
    setToken(token);
    const expirationTs = new Date(Date.now() + secTillExp).getTime();
    setExpiresIn(expirationTs);
    setUserData(user);

    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationTs);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
  };

  const setUserHandler = (user) => {
    setUserData(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        user,
        expiresIn,
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
